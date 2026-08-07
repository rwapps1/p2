// Edit these two filenames if yours differ from the defaults.
const APP_HTML = './index.html';
const WORDS_FILE = './words.xlsx';
const VERBS_FILE = './verbs.xlsx';

// The 15 category word lists (Categories game). Add/remove entries here if
// you add or rename a categories-*.xlsx file in the repo.
const CATEGORY_FILES = [
  './categories-animals.xlsx',
  './categories-bodyparts.xlsx',
  './categories-clothing.xlsx',
  './categories-colours.xlsx',
  './categories-dailyverbs.xlsx',
  './categories-daysandmonths.xlsx',
  './categories-emotions.xlsx',
  './categories-family.xlsx',
  './categories-foodanddrink.xlsx',
  './categories-greetings.xlsx',
  './categories-house.xlsx',
  './categories-numbers.xlsx',
  './categories-questionwords.xlsx',
  './categories-transport.xlsx',
  './categories-weather.xlsx',
];

const CACHE_NAME = 'palabra-cache-v2';
const ASSETS_TO_CACHE = [
  './',
  APP_HTML,
  './manifest.json',
  WORDS_FILE,
  VERBS_FILE,
  ...CATEGORY_FILES,
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(ASSETS_TO_CACHE).catch(() => {
        // If one asset 404s (e.g. a renamed file) don't let it block install entirely
        return Promise.allSettled(ASSETS_TO_CACHE.map((url) => cache.add(url)));
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first for speed, falling back to network, and re-caching fresh copies
// in the background so an update (e.g. a new words.xlsx) is picked up next load.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
