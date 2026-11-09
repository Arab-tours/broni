// Service worker: оболочка приложения работает офлайн, данные о бронях — всегда из сети.
const VERSION = 'stolik-v2';
const SHELL = [
  './', 'index.html', 'manifest.json', 'css/style.css?v=2',
  'js/config.js?v=2', 'js/data.js?v=2', 'js/api.js?v=2', 'js/app.js?v=2',
  'icons/icon-192.png', 'icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;                 // брони (POST) не трогаем
  if (url.hostname.endsWith('supabase.co')) return;       // база — только сеть
  if (url.origin === location.origin) {
    // свои файлы: сначала сеть (чтобы обновления доходили), офлайн — из кэша
    e.respondWith(fetch(e.request).then((res) => {
      const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); return res;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match('index.html'))));
    return;
  }
  // шрифты, Leaflet, тайлы карты: из кэша, если есть
  if (/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com|tile\.openstreetmap\.org/.test(url.hostname)) {
    e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); return res;
    })));
  }
});
