/* Столик — интерфейс. Чистый JS без сборки. */
(function () {
  const { RESTAURANTS, PRICE_TIERS, BOOKING_MINUTES, SLOT_STEP } = window.STOLIK_DATA;
  const API = window.StolikAPI;
  const $app = document.getElementById('app');
  const byId = Object.fromEntries(RESTAURANTS.map((r) => [r.id, r]));

  // ---------- время (Москва) ----------
  const MSK_OFFSET = 3 * 60;
  function mskNow() { return new Date(Date.now() + MSK_OFFSET * 60000); } // читать UTC-геттерами
  function todayStr() { return mskNow().toISOString().slice(0, 10); }
  function addDays(d, n) { const x = new Date(d + 'T12:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); }
  function nowMinutes() { const n = mskNow(); return n.getUTCHours() * 60 + n.getUTCMinutes(); }
  const hm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const toMin = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  const fmtDay = (d, opts) => new Date(d + 'T12:00:00+03:00').toLocaleDateString('ru-RU', Object.assign({ timeZone: 'Europe/Moscow' }, opts));
  function dayLabel(d) {
    const t = todayStr();
    if (d === t) return 'Сегодня';
    if (d === addDays(t, 1)) return 'Завтра';
    return fmtDay(d, { weekday: 'short', day: 'numeric', month: 'short' });
  }
  const fmtTimeISO = (iso) => new Date(iso).toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit' });
  const fmtDateISO = (iso) => new Date(iso).toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow', weekday: 'long', day: 'numeric', month: 'long' });

  function slotsFor(r, date) {
    const out = [];
    const minStart = date === todayStr() ? nowMinutes() + 15 : -1;
    for (let m = r.open * 60; m + BOOKING_MINUTES <= r.close * 60; m += SLOT_STEP) if (m >= minStart) out.push(hm(m));
    return out;
  }

  // ---------- состояние ----------
  const PREF_KEY = 'stolik.prefs.v1';
  const saved = (() => { try { return JSON.parse(localStorage.getItem(PREF_KEY)) || {}; } catch (e) { return {}; } })();
  function defaultWhen() {
    const t = todayStr();
    const n = nowMinutes() + 30;
    const want = Math.max(19 * 60, Math.ceil(n / 30) * 30);
    if (want + BOOKING_MINUTES <= 24 * 60) return { date: t, time: hm(want) };
    return { date: addDays(t, 1), time: '19:00' };
  }
  const when = defaultWhen();
  const state = {
    date: when.date, time: when.time, guests: saved.guests || 2,
    q: '', areas: new Set(), cuisines: new Set(), tiers: new Set(), metro: '', sort: 'top', onlyFree: false,
    filtersOpen: false, userPos: null, busy: {}, // busy[date] = { at, rows }
    sel: null, // выбор стола на странице ресторана
  };
  function savePrefs() { try { localStorage.setItem(PREF_KEY, JSON.stringify({ guests: state.guests, name: saved.name, phone: saved.phone })); } catch (e) {} }

  // ---------- занятость ----------
  async function loadBusy(date, force) {
    const c = state.busy[date];
    if (!force && c && Date.now() - c.at < 25000) return c.rows;
    const rows = await API.busyForDay(date);
    state.busy[date] = { at: Date.now(), rows };
    return rows;
  }

  // статус каждого стола на выбранный слот
  function tableStatus(r, date, time, guests, rows) {
    const start = API.toISO(date, time);
    const end = API.addMin(start, BOOKING_MINUTES);
    const busyIds = new Set(rows.filter((b) => b.restaurant_id === r.id && API.overlaps(b.starts_at, b.ends_at, start, end)).map((b) => b.table_id));
    const st = {};
    r.plan.tables.forEach((t) => {
      if (busyIds.has(t.id)) st[t.id] = 'busy';
      else if (t.shape === 'stool') st[t.id] = guests <= 4 ? 'free' : 'small';
      else if (t.seats < guests) st[t.id] = 'small';
      else st[t.id] = 'free';
    });
    return st;
  }

  // подряд идущие свободные места у стойки для компании
  function stoolRun(r, st, fromId, need) {
    const t0 = r.plan.tables.find((t) => t.id === fromId);
    const row = r.plan.tables.filter((t) => t.shape === 'stool' && t.zone === t0.zone);
    const i0 = row.indexOf(t0);
    for (let s = Math.max(0, i0 - need + 1); s <= i0; s++) {
      const run = row.slice(s, s + need);
      if (run.length === need && run.every((t) => st[t.id] === 'free') && run.includes(t0)) {
        // берём окно, где тапнутое место первым, если возможно
        return run.map((t) => t.id);
      }
    }
    return null;
  }

  function availability(r, date, time, guests, rows) {
    const opened = time && toMin(time) >= r.open * 60 && toMin(time) + BOOKING_MINUTES <= r.close * 60;
    if (!opened) return { open: false, free: 0, seatsFree: 0 };
    const st = tableStatus(r, date, time, guests, rows);
    let free = 0, seatsFree = 0, counterOK = false;
    r.plan.tables.forEach((t) => {
      if (st[t.id] !== 'free') return;
      if (t.shape === 'stool') { if (!counterOK && stoolRun(r, st, t.id, guests)) counterOK = true; seatsFree += 1; }
      else if (t.seats <= Math.max(guests + 4, guests * 2)) { free++; seatsFree += t.seats; }
    });
    return { open: true, free: free + (counterOK ? 1 : 0), counter: counterOK, seatsFree };
  }

  // ---------- утилиты UI ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const plural = (n, a, b, c) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20) ? b : c; };
  const rub = (n) => n.toLocaleString('ru-RU') + ' ₽';
  const tierLabel = (id) => PRICE_TIERS.find((t) => t.id === id).label;
  function toast(msg) {
    const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg;
    document.body.appendChild(el); requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 2600);
  }
  function km(a, b) {
    const R = 6371, dLat = (b.lat - a.lat) * Math.PI / 180, dLng = (b.lng - a.lng) * Math.PI / 180;
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  const ALL_AREAS = [...new Set(RESTAURANTS.map((r) => r.area))].sort();
  const ALL_CUISINES = [...new Set(RESTAURANTS.flatMap((r) => r.cuisine))].sort();
  const ALL_METRO = [...new Set(RESTAURANTS.flatMap((r) => r.metro))].sort();

  // ---------- шапка ----------
  function header(active) {
    const demo = API.mode === 'demo'
      ? '<div class="demo-bar">Демо-режим: брони сохраняются только в этом браузере, занятость столов условная</div>' : '';
    return `${demo}
    <header class="top">
      <a class="brand" href="#/" aria-label="Столик — на главную">
        <span class="brand-mark" aria-hidden="true">С</span><span class="brand-name">Столик</span>
      </a>
      <nav class="tabs" aria-label="Разделы">
        <a href="#/" class="${active === 'list' ? 'on' : ''}">Рестораны</a>
        <a href="#/map" class="${active === 'map' ? 'on' : ''}">Карта</a>
        <a href="#/my" class="${active === 'my' ? 'on' : ''}">Мои брони</a>
      </nav>
    </header>`;
  }

  // ---------- блок «когда и сколько» ----------
  function timeOptions() {
    const out = [];
    const minStart = state.date === todayStr() ? nowMinutes() + 15 : 0;
    for (let m = 8 * 60; m <= 22 * 60; m += 30) if (m >= minStart) out.push(hm(m));
    return out;
  }
  function whenBar() {
    const days = Array.from({ length: 30 }, (_, i) => addDays(todayStr(), i));
    const times = timeOptions();
    if (!times.includes(state.time)) state.time = times[0] || '19:00';
    return `<div class="when">
      <label class="field"><span>Дата</span>
        <select id="w-date">${days.map((d) => `<option value="${d}" ${d === state.date ? 'selected' : ''}>${esc(dayLabel(d))}</option>`).join('')}</select></label>
      <label class="field"><span>Время</span>
        <select id="w-time">${times.map((t) => `<option ${t === state.time ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
      <div class="field"><span>Гости</span>
        <div class="stepper"><button type="button" data-g="-1" aria-label="Меньше гостей">−</button><b id="w-guests">${state.guests}</b><button type="button" data-g="1" aria-label="Больше гостей">+</button></div></div>
    </div>`;
  }
  function bindWhen(rerender) {
    const d = document.getElementById('w-date'), t = document.getElementById('w-time');
    if (d) d.onchange = () => { state.date = d.value; rerender(); };
    if (t) t.onchange = () => { state.time = t.value; rerender(); };
    document.querySelectorAll('[data-g]').forEach((b) => b.onclick = () => {
      state.guests = Math.min(12, Math.max(1, state.guests + Number(b.dataset.g))); savePrefs(); rerender();
    });
  }

  // ---------- фильтры ----------
  function filtered(rows) {
    const q = state.q.trim().toLowerCase();
    let list = RESTAURANTS.filter((r) =>
      (!q || [r.name, r.address, r.area, ...r.cuisine, ...r.metro, ...r.tags].join(' ').toLowerCase().includes(q)) &&
      (!state.areas.size || state.areas.has(r.area)) &&
      (!state.cuisines.size || r.cuisine.some((c) => state.cuisines.has(c))) &&
      (!state.tiers.size || state.tiers.has(r.tier)) &&
      (!state.metro || r.metro.includes(state.metro)));
    const av = Object.fromEntries(list.map((r) => [r.id, rows ? availability(r, state.date, state.time, state.guests, rows) : null]));
    if (state.onlyFree && rows) list = list.filter((r) => av[r.id].free > 0);
    const order = Object.fromEntries(RESTAURANTS.map((r, i) => [r.id, i]));
    if (state.sort === 'cheap') list.sort((a, b) => a.check - b.check);
    else if (state.sort === 'expensive') list.sort((a, b) => b.check - a.check);
    else if (state.sort === 'free' && rows) list.sort((a, b) => av[b.id].free - av[a.id].free);
    else if (state.sort === 'near' && state.userPos) list.sort((a, b) => km(state.userPos, a) - km(state.userPos, b));
    else list.sort((a, b) => order[a.id] - order[b.id]);
    return { list, av };
  }
  function activeFilterCount() {
    return state.areas.size + state.cuisines.size + state.tiers.size + (state.metro ? 1 : 0) + (state.onlyFree ? 1 : 0);
  }
  function chips(name, values, set, labelFn) {
    return values.map((v) => `<button type="button" class="chip ${set.has(v) ? 'on' : ''}" data-chip="${name}" data-v="${esc(v)}" aria-pressed="${set.has(v)}">${esc(labelFn ? labelFn(v) : v)}</button>`).join('');
  }
  function filterPanel() {
    const n = activeFilterCount();
    return `<div class="search-row">
        <input id="q" type="search" placeholder="Название, кухня, метро…" value="${esc(state.q)}" autocomplete="off" aria-label="Поиск">
        <button type="button" class="btn-ghost filt-toggle ${state.filtersOpen ? 'on' : ''}" id="ft">Фильтры${n ? ` <i class="badge">${n}</i>` : ''}</button>
      </div>
      <div class="filters ${state.filtersOpen ? 'open' : ''}">
        <div class="frow"><h4>Район</h4><div class="chips">${chips('areas', ALL_AREAS, state.areas)}</div></div>
        <div class="frow"><h4>Кухня</h4><div class="chips">${chips('cuisines', ALL_CUISINES, state.cuisines)}</div></div>
        <div class="frow"><h4>Средний чек</h4><div class="chips">${PRICE_TIERS.map((t) => `<button type="button" class="chip ${state.tiers.has(t.id) ? 'on' : ''}" data-chip="tiers" data-v="${t.id}" aria-pressed="${state.tiers.has(t.id)}">${t.label} <small>${t.hint}</small></button>`).join('')}</div></div>
        <div class="frow two">
          <label class="field"><span>Метро</span><select id="metro"><option value="">Любое</option>${ALL_METRO.map((m) => `<option ${m === state.metro ? 'selected' : ''}>${esc(m)}</option>`).join('')}</select></label>
          <label class="check"><input type="checkbox" id="onlyFree" ${state.onlyFree ? 'checked' : ''}> Только со свободными столами</label>
        </div>
        ${n ? '<button type="button" class="link" id="reset">Сбросить фильтры</button>' : ''}
      </div>`;
  }
  function bindFilters(rerender) {
    const q = document.getElementById('q');
    if (q) q.oninput = () => { state.q = q.value; rerender(true); };
    const ft = document.getElementById('ft'); if (ft) ft.onclick = () => { state.filtersOpen = !state.filtersOpen; rerender(); };
    document.querySelectorAll('[data-chip]').forEach((b) => b.onclick = () => {
      const set = state[b.dataset.chip]; const v = b.dataset.chip === 'tiers' ? Number(b.dataset.v) : b.dataset.v;
      set.has(v) ? set.delete(v) : set.add(v); rerender();
    });
    const m = document.getElementById('metro'); if (m) m.onchange = () => { state.metro = m.value; rerender(); };
    const of = document.getElementById('onlyFree'); if (of) of.onchange = () => { state.onlyFree = of.checked; rerender(); };
    const rs = document.getElementById('reset'); if (rs) rs.onclick = () => {
      state.areas.clear(); state.cuisines.clear(); state.tiers.clear(); state.metro = ''; state.onlyFree = false; rerender();
    };
  }

  function availBadge(r, a) {
    if (!a) return '<span class="avail muted">Проверяем столы…</span>';
    if (!a.open) return `<span class="avail closed">В ${state.time} не работает · ${String(r.open).padStart(2, '0')}:00–${r.close === 24 ? '00' : r.close}:00</span>`;
    if (!a.free) return `<span class="avail none">Нет свободных столов на ${state.time}</span>`;
    return `<span class="avail ok">Свободно ${a.free} ${plural(a.free, 'стол', 'стола', 'столов')} на ${state.time}</span>`;
  }
  function card(r, a) {
    const dist = state.userPos ? `<span>${km(state.userPos, r).toFixed(1).replace('.', ',')} км</span>` : '';
    return `<a class="card" href="#/r/${r.id}">
      <div class="mono" aria-hidden="true" style="--h:${(r.lat * 9000 + r.lng * 7000) % 360}">${esc(r.name.replace(/[«»"]/g, '').trim()[0])}</div>
      <div class="card-body">
        <div class="card-top"><h3>${esc(r.name)}</h3><span class="tier">${tierLabel(r.tier)}</span></div>
        <p class="award">${esc(r.award)}</p>
        <p class="meta">${esc(r.cuisine.join(', '))} · ~${rub(r.check)}</p>
        <p class="meta">м. ${esc(r.metro[0])} · ${esc(r.area)} ${dist}</p>
        ${availBadge(r, a)}
      </div></a>`;
  }

  // ---------- страница: список ----------
  let rows = null;
  async function viewList() {
    const render = (soft) => {
      const { list, av } = filtered(rows);
      const html = `${header('list')}
        <main class="wrap">
          <section class="hero"><h1>Забронируйте стол в лучших ресторанах Москвы</h1>
          <p>20 мест из рейтингов WhereToEat, Michelin и Lemon Guide. Схема зала, свободные столы и бронь онлайн.</p></section>
          ${whenBar()}
          ${filterPanel()}
          <div class="list-head"><span>${list.length} ${plural(list.length, 'ресторан', 'ресторана', 'ресторанов')}</span>
            <select id="sort" aria-label="Сортировка">
              <option value="top" ${state.sort === 'top' ? 'selected' : ''}>Сначала лучшие</option>
              <option value="free" ${state.sort === 'free' ? 'selected' : ''}>Больше свободных столов</option>
              <option value="near" ${state.sort === 'near' ? 'selected' : ''}>Рядом со мной</option>
              <option value="cheap" ${state.sort === 'cheap' ? 'selected' : ''}>Сначала дешевле</option>
              <option value="expensive" ${state.sort === 'expensive' ? 'selected' : ''}>Сначала дороже</option>
            </select></div>
          <div class="cards">${list.map((r) => card(r, av[r.id])).join('') || '<p class="empty">Ничего не нашлось. Попробуйте убрать часть фильтров.</p>'}</div>
          <p class="foot-note">Места и награды — по рейтингам WhereToEat Москва 2026, гиду Michelin Moscow 2022 и Lemon Guide 2026. Средний чек — ориентир без напитков. Схемы залов примерные.</p>
        </main>`;
      if (soft) {
        // при вводе в поиск перерисовываем только список, чтобы не терять фокус
        const tmp = document.createElement('div'); tmp.innerHTML = html;
        document.querySelector('.cards').replaceWith(tmp.querySelector('.cards'));
        document.querySelector('.list-head span').textContent = tmp.querySelector('.list-head span').textContent;
        return;
      }
      $app.innerHTML = html;
      bindWhen(() => refresh());
      bindFilters(render);
      document.getElementById('sort').onchange = async (e) => {
        state.sort = e.target.value;
        if (state.sort === 'near' && !state.userPos) await locate();
        render();
      };
    };
    const refresh = async () => { render(); try { rows = await loadBusy(state.date); } catch (e) { toast(API.humanError(e)); rows = []; } if (route().name === 'list') render(); };
    rows = state.busy[state.date] ? state.busy[state.date].rows : null;
    await refresh();
  }

  function locate() {
    return new Promise((res) => {
      if (!navigator.geolocation) { toast('Геолокация недоступна'); state.sort = 'top'; return res(); }
      navigator.geolocation.getCurrentPosition(
        (p) => { state.userPos = { lat: p.coords.latitude, lng: p.coords.longitude }; res(); },
        () => { toast('Не удалось определить местоположение'); state.sort = 'top'; res(); },
        { timeout: 8000, maximumAge: 300000 });
    });
  }

  // ---------- страница: карта ----------
  let leafletPromise = null;
  function loadLeaflet() {
    if (window.L) return Promise.resolve();
    if (leafletPromise) return leafletPromise;
    leafletPromise = new Promise((res, rej) => {
      const css = document.createElement('link'); css.rel = 'stylesheet';
      css.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'; document.head.appendChild(css);
      const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      s.onload = res; s.onerror = () => { leafletPromise = null; rej(new Error('NETWORK')); }; document.head.appendChild(s);
    });
    return leafletPromise;
  }
  let mapToken = 0;
  async function viewMap() {
    const render = () => {
      const { list, av } = filtered(rows);
      $app.innerHTML = `${header('map')}
        <main class="wrap">${whenBar()}${filterPanel()}
          <div id="map" class="map" role="region" aria-label="Карта ресторанов"><p class="map-loading">Загружаем карту…</p></div>
          <p class="foot-note">${list.length} ${plural(list.length, 'ресторан', 'ресторана', 'ресторанов')} на карте. Нажмите на метку, чтобы открыть ресторан.</p>
        </main>`;
      bindWhen(async () => { rows = await loadBusy(state.date).catch(() => []); render(); });
      bindFilters(() => render());
      const token = ++mapToken;
      loadLeaflet().then(() => {
        const el = document.getElementById('map');
        if (!el || token !== mapToken || el._leaflet_id) return; // устаревшая отрисовка
        el.innerHTML = '';
        const map = L.map(el, { zoomControl: true, attributionControl: true }).setView([55.758, 37.605], 13);
        map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19, attribution: '© участники OpenStreetMap',
        }).addTo(map);
        const pts = [];
        list.forEach((r) => {
          const a = av[r.id]; const cls = !a ? '' : !a.open ? 'closed' : a.free ? 'ok' : 'none';
          const icon = L.divIcon({ className: '', html: `<div class="pin ${cls}"><span>${tierLabel(r.tier)}</span></div>`, iconSize: [44, 30], iconAnchor: [22, 30] });
          const m = L.marker([r.lat, r.lng], { icon, title: r.name.replace(/[«»]/g, '') }).addTo(map);
          m.bindPopup(`<div class="pop"><b>${esc(r.name)}</b><br>${esc(r.cuisine.join(', '))} · ~${rub(r.check)}<br>${availBadge(r, a)}<br><a href="#/r/${r.id}">Открыть и забронировать →</a></div>`);
          pts.push([r.lat, r.lng]);
        });
        if (pts.length > 1) map.fitBounds(pts, { padding: [30, 30] });
        else if (pts.length === 1) map.setView(pts[0], 15);
      }).catch(() => { const el = document.getElementById('map'); if (el) el.innerHTML = '<p class="map-loading">Карта не загрузилась — проверьте интернет.</p>'; });
    };
    rows = state.busy[state.date] ? state.busy[state.date].rows : null;
    render();
    try { rows = await loadBusy(state.date); } catch (e) { rows = []; }
    if (route().name === 'map') render();
  }

  // ---------- схема зала (SVG) ----------
  function chairs(t) {
    const out = []; const cx = t.x + t.w / 2, cy = t.y + t.h / 2;
    if (t.shape === 'stool') return '';
    if (t.shape === 'round') {
      for (let i = 0; i < t.seats; i++) {
        const a = (Math.PI * 2 * i) / t.seats - Math.PI / 2;
        out.push(`<circle class="chair" cx="${cx + Math.cos(a) * (t.w / 2 + 6)}" cy="${cy + Math.sin(a) * (t.h / 2 + 6)}" r="3.4"/>`);
      }
    } else if (t.shape === 'booth') {
      out.push(`<path class="booth-back" d="M${t.x - 4} ${t.y + t.h} V${t.y - 4} H${t.x + t.w + 4} V${t.y + t.h}"/>`);
    } else {
      const top = Math.ceil(t.seats / 2), bot = t.seats - top;
      const row = (n, y) => { for (let i = 0; i < n; i++) out.push(`<rect class="chair" x="${t.x + (t.w / n) * (i + 0.5) - 4}" y="${y}" width="8" height="5" rx="2"/>`); };
      row(top, t.y - 8); row(bot, t.y + t.h + 3);
    }
    return out.join('');
  }
  function planSVG(r, st, selected) {
    const P = r.plan;
    const zones = P.zones.map((z) => {
      let extra = '';
      if (z.kind === 'window') extra = `<line class="win" x1="${z.x + 8}" y1="${z.y + 24}" x2="${z.x + z.w - 8}" y2="${z.y + 24}"/>`;
      if (z.kind === 'counter') extra = `<rect class="bar" x="${z.x + 14}" y="${z.y + 28}" width="${z.w - 28}" height="14" rx="4"/>`;
      return `<g><rect class="zone" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="10"/>
        <text class="zone-name" x="${z.x + 10}" y="${z.y + 16}">${esc(z.name)}</text>${extra}</g>`;
    }).join('');
    const tables = P.tables.map((t) => {
      const s = selected && selected.includes(t.id) ? 'sel' : st[t.id];
      const label = t.shape === 'stool' ? '' : `<text class="tl" x="${t.x + t.w / 2}" y="${t.y + t.h / 2 + 4}">${esc(t.label)}</text>`;
      const shape = t.shape === 'round' || t.shape === 'stool'
        ? `<circle class="tb" cx="${t.x + t.w / 2}" cy="${t.y + t.h / 2}" r="${t.w / 2}"/>`
        : `<rect class="tb" x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="${t.shape === 'booth' ? 6 : 8}"/>`;
      const name = t.shape === 'stool' ? `место ${t.label.slice(1)} у стойки` : `стол ${t.label}, ${t.seats} ${plural(t.seats, 'место', 'места', 'мест')}`;
      const stateRu = { free: 'свободен', busy: 'занят', small: 'мало мест', sel: 'выбран' }[s];
      const focusable = s === 'free' || s === 'sel';
      return `<g class="t ${s}" data-t="${t.id}" ${focusable ? 'tabindex="0" role="button"' : ''} aria-label="${esc(t.zone)}: ${name} — ${stateRu}">
        <title>${esc(t.zone)}: ${name} — ${stateRu}</title>${chairs(t)}${shape}${label}</g>`;
    }).join('');
    return `<svg class="plan" viewBox="0 0 ${P.width} ${P.height}" role="group" aria-label="Схема зала">${zones}${tables}</svg>`;
  }

  // ---------- страница ресторана ----------
  async function viewRestaurant(id) {
    const r = byId[id];
    if (!r) { $app.innerHTML = `${header('')}<main class="wrap"><p class="empty">Ресторан не найден. <a href="#/">К списку</a></p></main>`; return; }
    document.title = `${r.name.replace(/[«»]/g, '')} — Столик`;
    let rRows = state.busy[state.date] ? state.busy[state.date].rows : null;
    state.sel = null;

    const render = () => {
      const slots = slotsFor(r, state.date);
      if (slots.length && !slots.includes(state.time)) state.time = slots.find((s) => toMin(s) >= toMin(state.time)) || slots[slots.length - 1];
      const st = rRows ? tableStatus(r, state.date, state.time, state.guests, rRows) : {};
      const a = rRows && slots.length ? availability(r, state.date, state.time, state.guests, rRows) : null;
      const days = Array.from({ length: 21 }, (_, i) => addDays(todayStr(), i));
      const slotHtml = slots.length ? slots.map((t) => {
        const av = rRows ? availability(r, state.date, t, state.guests, rRows) : null;
        const dis = av && !av.free;
        return `<button type="button" class="slot ${t === state.time ? 'on' : ''} ${dis ? 'dis' : ''}" data-slot="${t}" ${dis ? 'aria-disabled="true"' : ''}>${t}${av ? `<small>${av.free || 'нет'}</small>` : ''}</button>`;
      }).join('') : '<p class="empty small">На эту дату бронь уже недоступна — выберите другой день.</p>';
      const total = r.plan.tables.filter((t) => t.shape !== 'stool').length;
      const stools = r.plan.tables.length - total;
      const freeTables = rRows ? r.plan.tables.filter((t) => t.shape !== 'stool' && st[t.id] !== 'busy').length : '…';
      const freeStools = rRows ? r.plan.tables.filter((t) => t.shape === 'stool' && st[t.id] !== 'busy').length : '…';
      const ymaps = `https://yandex.ru/maps/?pt=${r.lng},${r.lat}&z=17&l=map`;

      $app.innerHTML = `${header('')}
      <main class="wrap rest">
        <a class="back" href="#/">← Все рестораны</a>
        <section class="r-head">
          <p class="award">${esc(r.award)}</p>
          <h1>${esc(r.name)}</h1>
          <p class="meta">${esc(r.cuisine.join(' · '))} · ${tierLabel(r.tier)} · средний чек ~${rub(r.check)}</p>
          <p class="about">${esc(r.about)}</p>
          <div class="tags">${r.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
          <dl class="facts">
            <div><dt>Адрес</dt><dd>${esc(r.address)} · <a href="${ymaps}" target="_blank" rel="noopener">на карте</a></dd></div>
            <div><dt>Метро</dt><dd>${esc(r.metro.join(', '))}</dd></div>
            <div><dt>Бронь</dt><dd>${String(r.open).padStart(2, '0')}:00–${r.close === 24 ? '00' : r.close}:00, стол на 2 часа</dd></div>
            <div><dt>Зал</dt><dd>${total} ${plural(total, 'стол', 'стола', 'столов')}${stools ? ` и ${stools} ${plural(stools, 'место', 'места', 'мест')} у стойки` : ''}, ~${r.seatCount} ${plural(r.seatCount, 'место', 'места', 'мест')}</dd></div>
          </dl>
        </section>

        <section class="book" aria-labelledby="bk">
          <h2 id="bk">Забронировать</h2>
          <div class="days" role="listbox" aria-label="Дата">${days.map((d) => `<button type="button" class="day ${d === state.date ? 'on' : ''}" data-day="${d}">${esc(dayLabel(d))}</button>`).join('')}</div>
          <div class="g-row"><span>Гостей</span>
            <div class="stepper"><button type="button" data-g="-1" aria-label="Меньше гостей">−</button><b>${state.guests}</b><button type="button" data-g="1" aria-label="Больше гостей">+</button></div></div>
          <div class="slots" aria-label="Время">${slotHtml}</div>
          <p class="slot-hint">Цифра под временем — сколько столов для вашей компании свободно.</p>
        </section>

        <section class="floor" aria-labelledby="fl">
          <div class="floor-head"><h2 id="fl">Схема зала</h2>
            <p class="stat">${slots.length ? `На ${state.time}: свободно <b>${freeTables}</b> из ${total} столов${stools ? ` · <b>${freeStools}</b> из ${stools} мест у стойки` : ''}` : ''}</p></div>
          <div class="legend"><span class="lg free">Свободен</span><span class="lg busy">Занят</span><span class="lg small">Мало мест</span><span class="lg sel">Выбран</span></div>
          <div class="plan-wrap">${slots.length ? planSVG(r, st, state.sel) : '<p class="empty small">Выберите другую дату.</p>'}</div>
          <p class="foot-note">Схема примерная и показывает логику рассадки, а не точный план ресторана. Нажмите на свободный стол, чтобы забронировать.</p>
        </section>
      </main>`;

      document.querySelectorAll('[data-day]').forEach((b) => b.onclick = async () => {
        state.date = b.dataset.day; rRows = null; render(); rRows = await loadBusy(state.date).catch((e) => { toast(API.humanError(e)); return []; }); render();
      });
      document.querySelectorAll('[data-slot]').forEach((b) => b.onclick = () => { state.time = b.dataset.slot; render(); });
      document.querySelectorAll('[data-g]').forEach((b) => b.onclick = () => { state.guests = Math.min(12, Math.max(1, state.guests + Number(b.dataset.g))); savePrefs(); render(); });
      document.querySelectorAll('g.t').forEach((g) => {
        const act = () => pickTable(g.dataset.t);
        g.addEventListener('click', act);
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
      });
      const sel = document.querySelector('.slot.on'); if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: 'nearest', inline: 'center' });
      const dsel = document.querySelector('.day.on'); if (dsel && dsel.scrollIntoView) dsel.scrollIntoView({ block: 'nearest', inline: 'center' });

      function pickTable(tid) {
        if (!rRows) return;
        const t = r.plan.tables.find((x) => x.id === tid);
        const s = st[tid];
        if (s === 'busy') return toast('Этот стол занят на выбранное время');
        if (s === 'small') return toast(t.shape === 'stool' ? 'У стойки — компании до 4 человек' : `За этим столом ${t.seats} ${plural(t.seats, 'место', 'места', 'мест')} — выберите стол побольше`);
        let ids = [tid];
        if (t.shape === 'stool' && state.guests > 1) {
          ids = stoolRun(r, st, tid, state.guests);
          if (!ids) return toast(`Рядом нет ${state.guests} свободных мест подряд`);
        }
        state.sel = ids; render(); openSheet(r, ids, () => { state.sel = null; render(); }, async () => {
          rRows = await loadBusy(state.date, true).catch(() => rRows); state.sel = null; render();
        });
      }
    };

    render();
    try { rRows = await loadBusy(state.date); } catch (e) { toast(API.humanError(e)); rRows = []; }
    if (route().name === 'rest' && route().id === id) render();
    window.__stolikRefresh = async () => { rRows = await loadBusy(state.date, true).catch(() => rRows); if (!document.querySelector('.sheet')) render(); };
  }

  // ---------- форма брони (нижний лист) ----------
  function openSheet(r, ids, onClose, onDone) {
    const tabs = ids.map((id) => r.plan.tables.find((t) => t.id === id));
    const t0 = tabs[0];
    const what = t0.shape === 'stool'
      ? `${tabs.length} ${plural(tabs.length, 'место', 'места', 'мест')} у стойки (${tabs.map((t) => t.label.slice(1)).join(', ')})`
      : `стол ${t0.label} · ${t0.seats} ${plural(t0.seats, 'место', 'места', 'мест')}`;
    const startISO = API.toISO(state.date, state.time);
    const endT = hm(toMin(state.time) + BOOKING_MINUTES);
    const wrap = document.createElement('div');
    wrap.className = 'sheet-wrap';
    wrap.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sh-t">
      <button type="button" class="x" aria-label="Закрыть">×</button>
      <p class="award">${esc(r.name)}</p>
      <h3 id="sh-t">${esc(t0.zone)}: ${esc(what)}</h3>
      <p class="meta">${esc(fmtDay(state.date, { weekday: 'long', day: 'numeric', month: 'long' }))}, ${state.time}–${endT} · ${state.guests} ${plural(state.guests, 'гость', 'гостя', 'гостей')}</p>
      <form id="bf" novalidate>
        <label class="field"><span>Имя</span><input name="name" required minlength="2" maxlength="80" autocomplete="name" value="${esc(saved.name || '')}"></label>
        <label class="field"><span>Телефон</span><input name="phone" type="tel" inputmode="tel" required autocomplete="tel" placeholder="+7 999 123-45-67" value="${esc(saved.phone || '')}"></label>
        <label class="field"><span>Комментарий <i>(необязательно)</i></span><textarea name="comment" maxlength="300" rows="2" placeholder="День рождения, детский стул, аллергия…"></textarea></label>
        <p class="err" role="alert" hidden></p>
        <button class="btn" type="submit">Забронировать</button>
        <p class="fine">Бронь держится 2 часа. Отменить можно в разделе «Мои брони».</p>
      </form></div>`;
    document.body.appendChild(wrap);
    document.body.classList.add('noscroll');
    requestAnimationFrame(() => wrap.classList.add('show'));
    const close = () => { wrap.classList.remove('show'); document.body.classList.remove('noscroll'); setTimeout(() => wrap.remove(), 250); document.removeEventListener('keydown', onKey); onClose && onClose(); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    wrap.querySelector('.x').onclick = close;
    wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });
    const f = wrap.querySelector('#bf'); const err = wrap.querySelector('.err');
    setTimeout(() => (f.name.value ? f.phone : f.name).focus(), 260);
    f.onsubmit = async (e) => {
      e.preventDefault();
      const name = f.name.value.trim(), phone = f.phone.value.trim(), comment = f.comment.value.trim();
      const digits = phone.replace(/\D/g, '');
      const bad = name.length < 2 ? 'Укажите имя' : !/^\+?[0-9 ()\-]{10,20}$/.test(phone) || digits.length < 10 ? 'Проверьте номер телефона' : '';
      if (bad) { err.textContent = bad; err.hidden = false; return; }
      const btn = f.querySelector('.btn'); btn.disabled = true; btn.textContent = 'Бронируем…'; err.hidden = true;
      try {
        const g = await API.bookGroup({ tableIds: ids, startsAt: startISO, guests: state.guests, name, phone, comment });
        saved.name = name; saved.phone = phone; savePrefs();
        onClose = null;
        wrap.querySelector('.sheet').innerHTML = `<div class="done">
          <div class="ok-mark" aria-hidden="true">✓</div>
          <h3>Стол забронирован</h3>
          <p>${esc(r.name)} · ${esc(fmtDay(state.date, { day: 'numeric', month: 'long' }))}, ${state.time}<br>${esc(what)}</p>
          <p class="code">Номер брони: <b>${g.gid.slice(0, 8).toUpperCase()}</b></p>
          ${API.mode === 'demo' ? '<p class="fine">Демо-режим: ресторан эту бронь не получит.</p>' : ''}
          <a class="btn" href="#/my">Мои брони</a>
          <button type="button" class="btn-ghost" id="more">Готово</button></div>`;
        wrap.querySelector('#more').onclick = () => close();
        onDone && onDone();
      } catch (ex) {
        err.textContent = API.humanError(ex); err.hidden = false; btn.disabled = false; btn.textContent = 'Забронировать';
        if (String(ex.message).includes('TABLE_TAKEN')) onDone && onDone();
      }
    };
  }

  // ---------- мои брони ----------
  async function viewMy() {
    document.title = 'Мои брони — Столик';
    $app.innerHTML = `${header('my')}<main class="wrap"><h1 class="page-h">Мои брони</h1><div id="my"><p class="empty">Загружаем…</p></div></main>`;
    let groups;
    try { groups = await API.myGroups(); } catch (e) { document.getElementById('my').innerHTML = `<p class="empty">${esc(API.humanError(e))}</p>`; return; }
    const box = document.getElementById('my'); if (!box) return;
    if (!groups.length) { box.innerHTML = '<p class="empty">Пока нет броней. <a href="#/">Выбрать ресторан</a></p><p class="foot-note">Брони привязаны к этому браузеру.</p>'; return; }
    const now = Date.now();
    groups.sort((a, b) => a.rows[0].starts_at.localeCompare(b.rows[0].starts_at));
    box.innerHTML = groups.map((g) => {
      const b = g.rows[0]; const r = byId[b.restaurant_id];
      const tabs = g.rows.map((x) => r && r.plan.tables.find((t) => t.id === x.table_id)).filter(Boolean);
      const what = tabs.length && tabs[0].shape === 'stool' ? `${tabs.length} ${plural(tabs.length, 'место', 'места', 'мест')} у стойки` : tabs.length ? `стол ${tabs[0].label} (${tabs[0].zone})` : '';
      const cancelled = g.rows.every((x) => x.status === 'cancelled');
      const past = new Date(b.ends_at).getTime() < now;
      const status = cancelled ? '<span class="st c">Отменена</span>' : past ? '<span class="st p">Прошла</span>' : '<span class="st a">Активна</span>';
      return `<article class="booking ${cancelled || past ? 'dim' : ''}">
        <div><p class="award">${status} · № ${g.gid.slice(0, 8).toUpperCase()}</p>
        <h3><a href="#/r/${b.restaurant_id}">${esc(r ? r.name : b.restaurant_id)}</a></h3>
        <p class="meta">${esc(fmtDateISO(b.starts_at))}, ${fmtTimeISO(b.starts_at)}–${fmtTimeISO(b.ends_at)}</p>
        <p class="meta">${esc(what)} · ${tabs.length > 1 ? tabs.length : b.guests} ${plural(tabs.length > 1 ? tabs.length : b.guests, 'гость', 'гостя', 'гостей')} · на имя ${esc(b.guest_name)}</p>
        ${r ? `<p class="meta">${esc(r.address)}</p>` : ''}</div>
        <div class="b-act">${!cancelled && !past ? `<button type="button" class="btn-ghost danger" data-cancel="${g.gid}">Отменить</button>` : `<button type="button" class="link" data-forget="${g.gid}">Убрать</button>`}</div>
      </article>`;
    }).join('') + '<p class="foot-note">Брони привязаны к этому браузеру: если очистить данные сайта, список пропадёт, но сами брони останутся.</p>';
    box.querySelectorAll('[data-cancel]').forEach((btn) => btn.onclick = async () => {
      if (!confirm('Отменить эту бронь?')) return;
      btn.disabled = true;
      const g = groups.find((x) => x.gid === btn.dataset.cancel);
      try { await API.cancelGroup(g); state.busy = {}; toast('Бронь отменена'); viewMy(); }
      catch (e) { btn.disabled = false; toast(API.humanError(e)); }
    });
    box.querySelectorAll('[data-forget]').forEach((btn) => btn.onclick = () => { API.forgetGroup(btn.dataset.forget); viewMy(); });
  }

  // ---------- роутер ----------
  function route() {
    const h = location.hash.replace(/^#/, '') || '/';
    const m = h.match(/^\/r\/([\w-]+)/);
    if (m) return { name: 'rest', id: m[1] };
    if (h.startsWith('/map')) return { name: 'map' };
    if (h.startsWith('/my')) return { name: 'my' };
    return { name: 'list' };
  }
  let lastRoute = '';
  function go() {
    const r = route();
    window.__stolikRefresh = null;
    if (r.name !== 'rest') document.title = 'Столик — бронь столов в ресторанах Москвы';
    const key = JSON.stringify(r);
    if (key !== lastRoute) window.scrollTo(0, 0);
    lastRoute = key;
    if (r.name === 'rest') viewRestaurant(r.id);
    else if (r.name === 'map') viewMap();
    else if (r.name === 'my') viewMy();
    else viewList();
  }
  window.addEventListener('hashchange', go);
  go();

  // Обновление занятости каждые 30 секунд, пока вкладка открыта
  setInterval(() => {
    if (document.hidden || document.querySelector('.sheet') || document.activeElement && /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    const r = route();
    if (r.name === 'rest' && window.__stolikRefresh) window.__stolikRefresh();
    else if (r.name === 'list') { state.busy = {}; viewList(); }
  }, 30000);

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
