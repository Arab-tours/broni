/*
 * Столик — данные ресторанов и генератор схем залов.
 * Адреса, кухня и средний чек сверены по 2+ источникам (ноябрь 2026).
 * Схемы залов — ПРИМЕРНЫЕ: рестораны не публикуют реальные планы.
 * Файл работает и в браузере (window.STOLIK_DATA), и в Node (seed-скрипт).
 */
(function (root) {
  // Ценовые уровни по среднему чеку на человека без напитков
  const PRICE_TIERS = [
    { id: 1, label: '₽', hint: 'до 3 000 ₽' },
    { id: 2, label: '₽₽', hint: '3 000–5 000 ₽' },
    { id: 3, label: '₽₽₽', hint: '5 000–8 000 ₽' },
    { id: 4, label: '₽₽₽₽', hint: 'от 8 000 ₽' },
  ];

  function tierFor(check) {
    if (check < 3000) return 1;
    if (check < 5000) return 2;
    if (check < 8000) return 3;
    return 4;
  }

  /*
   * layout: список зон. Типы зон:
   *  grid    — столы рядами: seats = массив вместимостей, cols = столов в ряд
   *  window  — ряд столов вдоль панорамных окон (seats массив)
   *  counter — барная/шефская стойка: n мест (каждое место — отдельный «стол» на 1)
   *  long    — один длинный общий стол на n мест
   *  booths  — диваны-кабинки (seats массив)
   */
  const RESTAURANTS = [
    {
      id: 'za-kryshey', name: '«За крышей»', award: 'WhereToEat Москва 2026 — №1',
      cuisine: ['Европейская', 'Авторская'], check: 5000,
      address: 'Столярный пер., 3, корп. 8, 3-й этаж (завод «Рассвет»)', metro: ['Улица 1905 года'],
      area: 'Пресня', lat: 55.7637, lng: 37.5605, open: 18, close: 24,
      about: 'Вечерний ресторан команды Big Wine Freaks с террасой на крыше. Шеф Марат Калайджян — авторский взгляд на европейскую кухню из локальных продуктов.',
      tags: ['Терраса', 'Винная карта', 'Только вечер'],
      layout: [
        { zone: 'Основной зал', kind: 'grid', cols: 4, seats: [2, 2, 4, 4, 2, 4, 4, 2] },
        { zone: 'Терраса', kind: 'grid', cols: 3, seats: [4, 4, 6, 2, 2, 4] },
        { zone: 'Бар', kind: 'counter', n: 6 },
      ],
    },
    {
      id: 'olluco', name: 'Olluco', award: 'WhereToEat Москва 2026 — №2',
      cuisine: ['Перуанская', 'Авторская'], check: 12000,
      address: 'Даев пер., 19', metro: ['Сухаревская', 'Сретенский бульвар'],
      area: 'Сретенка', lat: 55.7702, lng: 37.6355, open: 18, close: 24,
      about: 'Ресторан перуанского шефа Вирхилио Мартинеса (Central, Лима). Дегустационные сеты о биоразнообразии Перу и России, шеф Никанор Виейра.',
      tags: ['Дегустационный сет', 'Fine dining'],
      layout: [
        { zone: 'Основной зал', kind: 'grid', cols: 3, seats: [2, 2, 2, 4, 4, 2, 2, 4, 2] },
        { zone: 'Барная стойка', kind: 'counter', n: 6 },
      ],
    },
    {
      id: 'carniceria-vino', name: 'Carniceria Vino', award: 'WhereToEat Москва 2026 — №3',
      cuisine: ['Аргентинская', 'Мясная'], check: 5500,
      address: 'ул. Солянка, 1/2 (вход через пекарню Masa Madre)', metro: ['Китай-город'],
      area: 'Китай-город', lat: 55.7543, lng: 37.6365, open: 19, close: 24,
      about: 'Мясной ресторан Дениса Бобкова в старинных соляных подвалах. Асадор с живым огнём, шеф Роман Палкин.',
      tags: ['Открытый огонь', 'Подвал', 'Винная карта'],
      layout: [
        { zone: 'Соляной подвал', kind: 'grid', cols: 4, seats: [2, 4, 4, 2, 2, 4, 6, 2] },
        { zone: 'У асадора', kind: 'counter', n: 8 },
      ],
    },
    {
      id: 'savva', name: 'SAVVA', award: 'WhereToEat Москва 2026 — №4',
      cuisine: ['Русская', 'Авторская'], check: 5500,
      address: 'Театральный пр., 2, отель «Метрополь»', metro: ['Театральная', 'Охотный Ряд', 'Площадь Революции'],
      area: 'Кремль и Большой театр', lat: 55.7585, lng: 37.6216, open: 12, close: 24,
      about: 'Современная русская кухня бренд-шефа Андрея Шмакова в «Метрополе», напротив Большого театра. Звезда Michelin (гид 2022).',
      tags: ['Michelin ★', 'Chef’s table', 'Для праздника'],
      layout: [
        { zone: 'Основной зал', kind: 'grid', cols: 4, seats: [4, 4, 2, 2, 4, 6, 4, 2, 2, 4, 4, 2] },
        { zone: 'У окон на Театральный', kind: 'window', seats: [2, 2, 2, 4] },
        { zone: 'Chef’s table', kind: 'long', n: 10 },
      ],
    },
    {
      id: 'jun', name: 'Jun', award: 'WhereToEat Москва 2026 — №5',
      cuisine: ['Японская'], check: 8000,
      address: 'Большая Никитская ул., 24/1, стр. 6', metro: ['Арбатская', 'Охотный Ряд'],
      area: 'Никитская', lat: 55.7570, lng: 37.6019, open: 18, close: 24,
      about: 'Суши-бар Lucky Group в формате омакасе: нигири и сашими из 19 видов морепродуктов, места у стойки напротив шефа.',
      tags: ['Омакасе', 'Стойка шефа', 'Только вечер'],
      layout: [
        { zone: 'Стойка шефа', kind: 'counter', n: 8 },
        { zone: 'Зал', kind: 'grid', cols: 3, seats: [2, 2, 4, 2, 2, 4] },
      ],
    },
    {
      id: 'severyane', name: '«Северяне»', award: 'WhereToEat Москва 2026 — №6',
      cuisine: ['Русская', 'Скандинавская', 'Авторская'], check: 2800,
      address: 'Большая Никитская ул., 12', metro: ['Библиотека им. Ленина', 'Охотный Ряд'],
      area: 'Никитская', lat: 55.7563, lng: 37.6066, open: 9, close: 24,
      about: 'Проект Ильи Тютенкова: открытая кухня в центре зала, русские печи вместо плиты, долгие завтраки и коктейли на кордиалах.',
      tags: ['Завтраки', 'Открытая кухня', 'Русская печь'],
      layout: [
        { zone: 'Общий стол', kind: 'long', n: 12 },
        { zone: 'Зал у кухни', kind: 'grid', cols: 4, seats: [2, 2, 4, 4, 2, 2, 4, 2] },
        { zone: 'Бар', kind: 'counter', n: 6 },
      ],
    },
    {
      id: 'probka', name: 'Probka на Цветном', award: 'WhereToEat Москва 2026 — №7',
      cuisine: ['Итальянская'], check: 4000,
      address: 'Цветной б-р, 2, «Легенда Цветного»', metro: ['Трубная', 'Цветной бульвар'],
      area: 'Цветной бульвар', lat: 55.7680, lng: 37.6203, open: 12, close: 24,
      about: 'Московская «Пробка» Арама Мнацаканова — высокая траттория с открытой кухней. Около 110 посадочных мест.',
      tags: ['Открытая кухня', 'Терраса', 'Большие компании'],
      layout: [
        { zone: 'Основной зал', kind: 'grid', cols: 5, seats: [4, 4, 4, 2, 2, 4, 6, 4, 2, 2, 4, 4, 4, 2, 2] },
        { zone: 'Диваны', kind: 'booths', seats: [4, 4, 6, 6] },
        { zone: 'Терраса', kind: 'grid', cols: 4, seats: [2, 4, 4, 2, 2, 4, 4, 2] },
        { zone: 'Бар', kind: 'counter', n: 8 },
      ],
    },
    {
      id: 'bruno', name: 'Bruno', award: 'WhereToEat Москва 2026 — №8',
      cuisine: ['Стейк-хаус', 'Мясная'], check: 6500,
      address: 'ул. Неглинная, 14/1а', metro: ['Кузнецкий Мост', 'Трубная'],
      area: 'Неглинная', lat: 55.7642, lng: 37.6213, open: 12, close: 24,
      about: 'Стейк-хаус Lucky Group: русское вагю сухой выдержки, австралийский шеф Том Халпин, классическая «взрослая» атмосфера.',
      tags: ['Стейки', 'Деловой ужин'],
      layout: [
        { zone: 'Основной зал', kind: 'grid', cols: 4, seats: [2, 4, 4, 2, 4, 6, 6, 4] },
        { zone: 'Кабинки', kind: 'booths', seats: [4, 4, 6] },
        { zone: 'Бар', kind: 'counter', n: 6 },
      ],
    },
    {
      id: 'onest', name: 'Onest', award: 'WhereToEat Москва 2026 — №9',
      cuisine: ['Итальянская', 'Авторская'], check: 7000,
      address: 'ул. Малая Бронная, 8/1, 2-й этаж', metro: ['Пушкинская', 'Маяковская'],
      area: 'Патриаршие', lat: 55.7612, lng: 37.5975, open: 12, close: 24,
      about: 'Итальянский fine dining Аркадия Новикова над «Аистом». Шеф Мирко Дзаго — «Шеф-повар года» WhereToEat 2026. 77 посадочных мест.',
      tags: ['Fine dining', 'Дегустационный сет'],
      layout: [
        { zone: 'Белый зал', kind: 'grid', cols: 4, seats: [2, 2, 4, 4, 2, 4, 6, 2, 2, 4, 4, 2] },
        { zone: 'У окон', kind: 'window', seats: [2, 2, 2, 2, 4] },
        { zone: 'Приватный стол', kind: 'long', n: 10 },
      ],
    },
    {
      id: 'leo', name: 'Leo', award: 'WhereToEat Москва 2026 — №10',
      cuisine: ['Средиземноморская'], check: 4500,
      address: 'ул. Усачёва, 15, ЖК «Садовые кварталы»', metro: ['Спортивная', 'Фрунзенская'],
      area: 'Хамовники', lat: 55.7280, lng: 37.5710, open: 12, close: 24,
      about: 'Приморская гостиная в Хамовниках от ресторатора Генриха Карпина, шеф Сергей Балашов. Интерьер — Sundukovy Sisters.',
      tags: ['Средиземноморье', 'Веранда'],
      layout: [
        { zone: 'Гостиная', kind: 'grid', cols: 4, seats: [2, 4, 4, 2, 2, 4, 4, 2] },
        { zone: 'Диваны', kind: 'booths', seats: [4, 6] },
        { zone: 'Веранда', kind: 'grid', cols: 3, seats: [2, 4, 2, 4, 4, 2] },
      ],
    },
    {
      id: 'white-rabbit', name: 'White Rabbit', award: 'Lemon Guide 2026 — три лимона',
      cuisine: ['Русская', 'Авторская'], check: 8000,
      address: 'Смоленская пл., 3, 16-й этаж («Смоленский пассаж»)', metro: ['Смоленская'],
      area: 'Арбат и Смоленская', lat: 55.7477, lng: 37.5822, open: 12, close: 24,
      about: 'Панорамный ресторан под стеклянным куполом: современная русская кухня Бориса Зарькова и Владимира Мухина. Звезда Michelin (гид 2022).',
      tags: ['Michelin ★', 'Панорама', 'Бронь заранее'],
      layout: [
        { zone: 'У панорамных окон', kind: 'window', seats: [2, 2, 2, 2, 4, 4] },
        { zone: 'Под куполом', kind: 'grid', cols: 4, seats: [4, 4, 2, 2, 4, 6, 6, 4, 2, 2, 4, 2] },
        { zone: 'Бар', kind: 'counter', n: 8 },
      ],
    },
    {
      id: 'twins-garden', name: 'Twins Garden', award: 'Michelin ★★ (гид 2022)',
      cuisine: ['Русская', 'Авторская'], check: 7500,
      address: 'Страстной б-р, 8А', metro: ['Чеховская', 'Пушкинская'],
      area: 'Пушкинская', lat: 55.7669, lng: 37.6085, open: 12, close: 24,
      about: 'Концепция «от фермы до стола», двухуровневый зал, одна из крупнейших винных коллекций в России. Шеф — Виталий Савельев.',
      tags: ['Michelin ★★', 'Дегустационный сет', 'Своя ферма'],
      layout: [
        { zone: 'Первый уровень', kind: 'grid', cols: 4, seats: [2, 2, 4, 4, 2, 4, 4, 2] },
        { zone: 'Второй уровень', kind: 'grid', cols: 4, seats: [2, 4, 4, 2, 6, 4, 2, 2] },
        { zone: 'Chef’s table', kind: 'long', n: 8 },
      ],
    },
    {
      id: 'beluga', name: '«Белуга»', award: 'Michelin ★ (гид 2022)',
      cuisine: ['Русская', 'Морепродукты'], check: 7000,
      address: 'ул. Моховая, 15/1, стр. 1, отель «Националь»', metro: ['Охотный Ряд'],
      area: 'Кремль и Большой театр', lat: 55.7572, lng: 37.6143, open: 12, close: 24,
      about: 'Икорный ресторан с видом на Кремль и Исторический музей. С 2025 года кухню ведёт Роман Чистов.',
      tags: ['Michelin ★', 'Икра', 'Вид на Кремль'],
      layout: [
        { zone: 'У окон на Кремль', kind: 'window', seats: [2, 2, 2, 4, 4] },
        { zone: 'Зал', kind: 'grid', cols: 4, seats: [2, 4, 4, 2, 2, 4, 6, 2] },
      ],
    },
    {
      id: 'sakhalin', name: '«Сахалин»', award: 'Michelin ★ (гид 2022)',
      cuisine: ['Морепродукты', 'Дальневосточная'], check: 6500,
      address: 'ул. Смоленская, 8, верхние этажи отеля «Азимут»', metro: ['Смоленская'],
      area: 'Арбат и Смоленская', lat: 55.7458, lng: 37.5815, open: 12, close: 24,
      about: 'Морепродукты Дальнего Востока, raw bar с ледяной витриной и терраса с круговой панорамой. Проект White Rabbit Family.',
      tags: ['Michelin ★', 'Панорама', 'Морепродукты'],
      layout: [
        { zone: 'Второй этаж, панорама', kind: 'window', seats: [2, 2, 2, 4, 4, 2] },
        { zone: 'Зал у raw bar', kind: 'grid', cols: 4, seats: [2, 4, 4, 2, 4, 6, 2, 2] },
        { zone: 'Терраса', kind: 'grid', cols: 3, seats: [2, 2, 4, 4, 2, 2] },
      ],
    },
    {
      id: 'dr-zhivago', name: '«Dr. Живаго»', award: 'Гранд-кафе у Манежной',
      cuisine: ['Русская'], check: 3000,
      address: 'ул. Моховая, 15/1, отель «Националь»', metro: ['Охотный Ряд'],
      area: 'Кремль и Большой театр', lat: 55.7568, lng: 37.6139, open: 12, close: 24,
      about: 'Гранд-кафе с видом на Кремль и Манежную площадь: оливье с крабом, пожарская котлета, блины с икрой, медовик.',
      tags: ['Вид на Кремль', 'Завтраки', 'Для туристов'],
      layout: [
        { zone: 'У окон на Манежную', kind: 'window', seats: [2, 2, 4, 4, 2, 2] },
        { zone: 'Белый зал', kind: 'grid', cols: 5, seats: [2, 4, 4, 2, 2, 4, 4, 6, 4, 2] },
        { zone: 'Диваны', kind: 'booths', seats: [4, 4, 6] },
      ],
    },
    {
      id: 'cafe-pushkin', name: '«Кафе Пушкинъ»', award: 'Классика Москвы с 1999 года',
      cuisine: ['Русская', 'Французская'], check: 5000,
      address: 'Тверской б-р, 26А', metro: ['Пушкинская', 'Тверская', 'Чеховская'],
      area: 'Пушкинская', lat: 55.7638, lng: 37.6038, open: 12, close: 24,
      about: 'Ресторан Андрея Деллоса в духе дворянской усадьбы: залы «Аптека», «Библиотека», «Антресоль»; русско-французская кухня пушкинской поры.',
      tags: ['Исторический интерьер', 'Для гостей города'],
      layout: [
        { zone: 'Аптека', kind: 'grid', cols: 4, seats: [2, 4, 4, 2, 2, 4, 4, 2] },
        { zone: 'Библиотека', kind: 'grid', cols: 3, seats: [2, 4, 6, 4, 2, 4] },
        { zone: 'Антресоль', kind: 'window', seats: [2, 2, 4, 4] },
      ],
    },
    {
      id: 'maya', name: 'Maya', award: 'WhereToEat International 2026 — топ-10',
      cuisine: ['Гриль', 'Авторская'], check: 5000,
      address: 'Большая Никитская ул., 24/1, стр. 6', metro: ['Арбатская', 'Охотный Ряд'],
      area: 'Никитская', lat: 55.7572, lng: 37.6015, open: 12, close: 24,
      about: 'Lucky Group: «пещера» с живым огнём, дерево и дым, блюда на углях. Есть отдельный Maya bar room.',
      tags: ['Открытый огонь', 'Бар'],
      layout: [
        { zone: 'Зал у огня', kind: 'grid', cols: 4, seats: [2, 4, 4, 2, 2, 4, 4, 2] },
        { zone: 'Maya bar room', kind: 'booths', seats: [4, 4, 6] },
        { zone: 'Бар', kind: 'counter', n: 6 },
      ],
    },
    {
      id: 'grand-cru', name: 'Grand Cru', award: 'Michelin ★ (гид 2022)',
      cuisine: ['Французская', 'Винная'], check: 6000,
      address: 'ул. Малая Бронная, 22, стр. 2', metro: ['Пушкинская', 'Маяковская'],
      area: 'Патриаршие', lat: 55.7630, lng: 37.5925, open: 13, close: 24,
      about: 'Легендарный винный ресторан Simple Group на Патриарших: около 1 400 позиций в карте, шеф Давид Эммерле.',
      tags: ['Michelin ★', 'Винная карта'],
      layout: [
        { zone: 'Зал', kind: 'grid', cols: 4, seats: [2, 2, 4, 2, 4, 4, 2, 2] },
        { zone: 'Стойка', kind: 'counter', n: 6 },
      ],
    },
    {
      id: 'motto-azabu', name: 'Motto Azabu', award: 'WhereToEat Москва 2026 — «Выбор СМИ»',
      cuisine: ['Японская'], check: 9000,
      address: 'Театральный пр., 2, правое крыло «Метрополя»', metro: ['Площадь Революции', 'Театральная'],
      area: 'Кремль и Большой театр', lat: 55.7589, lng: 37.6225, open: 12, close: 24,
      about: 'Ресторан Дениса Иванова о современном Токио, открыт в марте 2026. Нижний зал с иммерсивной панорамой ночного города.',
      tags: ['Новинка 2026', 'Саке-бар'],
      layout: [
        { zone: 'Верхний зал', kind: 'grid', cols: 4, seats: [2, 2, 4, 4, 2, 4, 4, 2] },
        { zone: 'Нижний зал «Ночной Токио»', kind: 'booths', seats: [4, 4, 6, 6] },
        { zone: 'Саке-бар', kind: 'counter', n: 8 },
      ],
    },
    {
      id: 'ruski', name: 'Ruski', award: 'Самый высокий ресторан Европы',
      cuisine: ['Русская'], check: 3500,
      address: '1-й Красногвардейский пр., 21, стр. 2, башня «ОКО», 85-й этаж', metro: ['Деловой центр', 'Международная'],
      area: 'Москва-Сити', lat: 55.7497, lng: 37.5345, open: 12, close: 24,
      about: 'Русская кухня на 85-м этаже: печь, пельмени, наливки и вид на всю Москву. Зал примерно на 300 гостей.',
      tags: ['Панорама', 'Большие компании', 'Для гостей города'],
      layout: [
        { zone: 'У окон (с предоплатой)', kind: 'window', seats: [2, 2, 2, 4, 4, 4, 2, 2] },
        { zone: 'Центральный зал', kind: 'grid', cols: 5, seats: [4, 4, 6, 4, 4, 2, 4, 8, 4, 2, 4, 4, 6, 4, 4] },
        { zone: 'Кабинки', kind: 'booths', seats: [6, 6, 8] },
      ],
    },
  ];

  // ---------- Генератор схемы зала ----------
  const W = 360;          // ширина холста (viewBox)
  const PAD = 14;         // поля
  const HEAD = 26;        // высота подписи зоны

  function sizeFor(seats) {
    if (seats <= 2) return { w: 34, h: 34, shape: 'round' };
    if (seats <= 4) return { w: 46, h: 46, shape: 'rect' };
    if (seats <= 6) return { w: 64, h: 42, shape: 'rect' };
    return { w: 82, h: 44, shape: 'rect' };
  }

  function buildLayout(r) {
    const tables = [];
    const zones = [];
    let y = PAD;
    let num = 1;
    r.layout.forEach((z, zi) => {
      const top = y;
      let inner = top + HEAD;
      let bottom;
      const push = (t) => { tables.push(Object.assign({ id: `${r.id}-${zi}-${tables.length}`, zone: z.zone }, t)); };

      if (z.kind === 'grid') {
        const cols = z.cols;
        const cellW = (W - PAD * 2) / cols;
        const rows = Math.ceil(z.seats.length / cols);
        const cellH = 66;
        z.seats.forEach((s, i) => {
          const c = i % cols, row = Math.floor(i / cols);
          const sz = sizeFor(s);
          push({ label: String(num++), seats: s, shape: sz.shape, w: sz.w, h: sz.h,
            x: PAD + c * cellW + (cellW - sz.w) / 2, y: inner + row * cellH + (cellH - sz.h) / 2 });
        });
        bottom = inner + rows * cellH;
      } else if (z.kind === 'window') {
        const n = z.seats.length;
        const cellW = (W - PAD * 2) / n;
        z.seats.forEach((s, i) => {
          const sz = sizeFor(s);
          const w = Math.min(sz.w, cellW - 6);
          push({ label: String(num++), seats: s, shape: sz.shape, w, h: sz.h,
            x: PAD + i * cellW + (cellW - w) / 2, y: inner + 14 });
        });
        bottom = inner + 14 + 50;
      } else if (z.kind === 'booths') {
        const n = z.seats.length;
        const cellW = (W - PAD * 2) / n;
        z.seats.forEach((s, i) => {
          const w = Math.min(cellW - 12, 96);
          push({ label: String(num++), seats: s, shape: 'booth', w, h: 48,
            x: PAD + i * cellW + (cellW - w) / 2, y: inner + 8 });
        });
        bottom = inner + 8 + 60;
      } else if (z.kind === 'counter') {
        const n = z.n;
        const span = W - PAD * 2 - 20;
        const step = span / n;
        for (let i = 0; i < n; i++) {
          push({ label: 'Б' + (i + 1), seats: 1, shape: 'stool', w: 22, h: 22,
            x: PAD + 10 + i * step + (step - 22) / 2, y: inner + 26 });
        }
        bottom = inner + 26 + 34;
      } else if (z.kind === 'long') {
        const w = Math.min(W - PAD * 2 - 40, 30 + z.n * 22);
        push({ label: String(num++), seats: z.n, shape: 'long', w, h: 40,
          x: (W - w) / 2, y: inner + 12 });
        bottom = inner + 12 + 52;
      }
      zones.push({ name: z.zone, kind: z.kind, x: PAD / 2, y: top, w: W - PAD, h: bottom - top + 6 });
      y = bottom + 18;
    });
    return { width: W, height: y, zones, tables };
  }

  RESTAURANTS.forEach((r) => {
    r.tier = tierFor(r.check);
    r.plan = buildLayout(r);
    r.tableCount = r.plan.tables.length;
    r.seatCount = r.plan.tables.reduce((a, t) => a + t.seats, 0);
  });

  const DATA = { RESTAURANTS, PRICE_TIERS, BOOKING_MINUTES: 120, SLOT_STEP: 30 };
  if (typeof module !== 'undefined' && module.exports) module.exports = DATA;
  else root.STOLIK_DATA = DATA;
})(typeof window !== 'undefined' ? window : globalThis);
