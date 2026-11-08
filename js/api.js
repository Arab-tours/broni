/*
 * Слой работы с данными броней.
 *  - RemoteBackend: Supabase (PostgreSQL) через REST RPC-функции из supabase/schema.sql
 *  - LocalBackend: демо-режим, брони в localStorage + имитация занятости «чужими» гостями
 * Время везде московское (UTC+3, без перехода на летнее время).
 */
(function () {
  const cfg = window.STOLIK_CONFIG || {};
  const { RESTAURANTS, BOOKING_MINUTES } = window.STOLIK_DATA;
  const MSK = '+03:00';
  const MINE_KEY = 'stolik.mine.v1';

  const ERRORS = {
    TABLE_TAKEN: 'Этот стол только что заняли. Выберите другой.',
    TOO_MANY_GUESTS: 'За этим столом меньше мест, чем гостей.',
    IN_PAST: 'Это время уже прошло.',
    TOO_FAR: 'Бронировать можно не дальше чем на 60 дней вперёд.',
    CLOSED: 'Ресторан в это время не работает.',
    TOO_MANY_BOOKINGS: 'На этот номер уже 5 активных броней.',
    TABLE_NOT_FOUND: 'Стол не найден — обновите страницу.',
    NETWORK: 'Нет связи с сервером. Проверьте интернет и попробуйте ещё раз.',
  };
  function humanError(e) {
    const msg = String((e && e.message) || e || '');
    for (const code of Object.keys(ERRORS)) if (msg.includes(code)) return ERRORS[code];
    return 'Не получилось: ' + msg.slice(0, 160);
  }

  // ---------- общие помощники ----------
  const toISO = (date, hhmm) => `${date}T${hhmm}:00${MSK}`;
  const addMin = (iso, m) => new Date(new Date(iso).getTime() + m * 60000).toISOString();
  const overlaps = (aS, aE, bS, bE) => new Date(aS) < new Date(bE) && new Date(aE) > new Date(bS);
  const tableById = {};
  RESTAURANTS.forEach((r) => r.plan.tables.forEach((t) => { tableById[t.id] = { t, r }; }));

  function loadMine() {
    try { return JSON.parse(localStorage.getItem(MINE_KEY)) || []; } catch (e) { return []; }
  }
  function saveMine(list) {
    try { localStorage.setItem(MINE_KEY, JSON.stringify(list)); } catch (e) { /* приватный режим */ }
  }

  // ---------- Supabase ----------
  function RemoteBackend(url, key) {
    const base = url.replace(/\/+$/, '');
    async function rpc(name, params) {
      let res;
      try {
        res = await fetch(`${base}/rest/v1/rpc/${name}`, {
          method: 'POST',
          headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });
      } catch (e) { throw new Error('NETWORK'); }
      const text = await res.text();
      const body = text ? JSON.parse(text) : null;
      if (!res.ok) throw new Error((body && (body.message || body.hint)) || res.statusText);
      return body;
    }
    return {
      mode: 'remote',
      busy: (from, to, rid) => rpc('busy_slots', { p_from: from, p_to: to, p_restaurant: rid || null }),
      async book(b) {
        const rows = await rpc('book_table', {
          p_table_id: b.tableId, p_starts_at: b.startsAt, p_guests: b.guests,
          p_name: b.name, p_phone: b.phone, p_comment: b.comment || null, p_minutes: BOOKING_MINUTES,
        });
        return rows[0];
      },
      myBookings: (secrets) => secrets.length ? rpc('my_bookings', { p_secrets: secrets }) : Promise.resolve([]),
      cancel: (id, secret) => rpc('cancel_booking', { p_id: id, p_secret: secret }),
    };
  }

  // ---------- Демо (localStorage) ----------
  function LocalBackend() {
    const KEY = 'stolik.demo.bookings.v1';
    const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
    const save = (l) => { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) {} };
    const uuid = () => (crypto.randomUUID ? crypto.randomUUID() :
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16);
      }));

    // Детерминированная «чужая» занятость, чтобы схема в демо не была пустой.
    function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
    function fakeBusy(date) {
      const out = [];
      RESTAURANTS.forEach((r) => {
        r.plan.tables.forEach((t) => {
          for (let hr = r.open; hr <= r.close - 2; hr += 2) {
            const h = hash(`${date}|${t.id}|${hr}`);
            const evening = hr >= 18 && hr <= 21 ? 0.3 : 0.12;
            if ((h % 1000) / 1000 < evening) {
              const startMin = hr * 60 + ((h >> 10) % 2) * 30;
              const hh = String(Math.floor(startMin / 60)).padStart(2, '0');
              const mm = String(startMin % 60).padStart(2, '0');
              if (startMin + BOOKING_MINUTES > r.close * 60) continue;
              const s = toISO(date, `${hh}:${mm}`);
              out.push({ restaurant_id: r.id, table_id: t.id, starts_at: s, ends_at: addMin(s, BOOKING_MINUTES), fake: true });
            }
          }
        });
      });
      return out;
    }

    return {
      mode: 'demo',
      async busy(from, to, rid) {
        const day = from.slice(0, 10);
        const all = load().filter((b) => b.status === 'active').concat(fakeBusy(day));
        return all.filter((b) => overlaps(b.starts_at, b.ends_at, from, to) && (!rid || b.restaurant_id === rid))
          .map(({ restaurant_id, table_id, starts_at, ends_at }) => ({ restaurant_id, table_id, starts_at, ends_at }));
      },
      async book(b) {
        const ref = tableById[b.tableId];
        if (!ref) throw new Error('TABLE_NOT_FOUND');
        if (b.guests > ref.t.seats) throw new Error('TOO_MANY_GUESTS');
        if (new Date(b.startsAt) < new Date(Date.now() - 5 * 60000)) throw new Error('IN_PAST');
        const ends = addMin(b.startsAt, BOOKING_MINUTES);
        const taken = (await this.busy(b.startsAt, ends, ref.r.id)).some((x) => x.table_id === b.tableId);
        if (taken) throw new Error('TABLE_TAKEN');
        const row = {
          id: uuid(), secret: uuid(), restaurant_id: ref.r.id, table_id: b.tableId, guests: b.guests,
          guest_name: b.name, phone: b.phone, comment: b.comment || null,
          starts_at: new Date(b.startsAt).toISOString(), ends_at: ends, status: 'active',
        };
        const list = load(); list.push(row); save(list);
        await new Promise((r) => setTimeout(r, 250)); // имитация сети
        return { id: row.id, secret: row.secret };
      },
      async myBookings(secrets) {
        return load().filter((b) => secrets.includes(b.secret)).sort((a, b) => a.starts_at.localeCompare(b.starts_at));
      },
      async cancel(id, secret) {
        const list = load(); const b = list.find((x) => x.id === id && x.secret === secret && x.status === 'active');
        if (!b) return false; b.status = 'cancelled'; save(list); return true;
      },
    };
  }

  const backend = cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY
    ? RemoteBackend(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY)
    : LocalBackend();

  // Брони этого браузера: группа = одна бронь гостя (может быть несколько мест у стойки)
  window.StolikAPI = {
    mode: backend.mode,
    humanError, toISO, addMin, overlaps,
    busyForDay(date, rid) {
      return backend.busy(toISO(date, '00:00'), addMin(toISO(date, '00:00'), 26 * 60), rid);
    },
    async bookGroup({ tableIds, startsAt, guests, name, phone, comment }) {
      const created = [];
      try {
        for (let i = 0; i < tableIds.length; i++) {
          const g = tableIds.length > 1 ? 1 : guests;
          const res = await backend.book({ tableId: tableIds[i], startsAt, guests: g, name, phone, comment });
          created.push({ id: res.id, secret: res.secret });
        }
      } catch (e) {
        for (const c of created) { try { await backend.cancel(c.id, c.secret); } catch (_) {} }
        throw e;
      }
      const group = { gid: created[0].id, parts: created, createdAt: new Date().toISOString() };
      const mine = loadMine(); mine.push(group); saveMine(mine);
      return group;
    },
    async myGroups() {
      const mine = loadMine();
      const secrets = mine.flatMap((g) => g.parts.map((p) => p.secret));
      const rows = await backend.myBookings(secrets);
      const bySecret = {}; rows.forEach((r) => { bySecret[r.secret] = r; });
      return mine.map((g) => ({ gid: g.gid, parts: g.parts, rows: g.parts.map((p) => bySecret[p.secret]).filter(Boolean) }))
        .filter((g) => g.rows.length);
    },
    async cancelGroup(group) {
      for (const p of group.parts) await backend.cancel(p.id, p.secret);
    },
    forgetGroup(gid) { saveMine(loadMine().filter((g) => g.gid !== gid)); },
  };
})();
