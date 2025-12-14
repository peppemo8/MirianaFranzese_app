// Increment the cache version to force browsers to fetch the latest app files.
const CACHE_NAME = 'miriana-app-v3';
const FILES_TO_CACHE = [
  '/MirianaFranzese_app/',
  '/MirianaFranzese_app/index.html',
  '/MirianaFranzese_app/manifest.webmanifest',
  '/MirianaFranzese_app/icon-512.png',
  '/MirianaFranzese_app/sw.js'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      return response || fetch(evt.request);
    })
  );
});
