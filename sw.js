// Service worker for MirianaFranzese_app
// Update the cache version to ensure browsers always fetch the latest files
const CACHE_NAME = 'miriana-app-v5';

const FILES_TO_CACHE = [
  '/MirianaFranzese_app/',
  '/MirianaFranzese_app/index.html',
  '/MirianaFranzese_app/manifest.webmanifest',
  '/MirianaFranzese_app/icon-512.png',
  '/MirianaFranzese_app/sw.js'
];

// Install event: cache required assets and activate immediately
self.addEventListener('install', (event) => {
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

// Activate event: remove old caches and take control of all clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  // Ensure that the current service worker starts controlling all open pages
  self.clients.claim();
});

// Fetch event: network-first for navigation and cache-first for other requests
self.addEventListener('fetch', (event) => {
  // For navigation requests (e.g., clicking links or loading the app), try network first
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/MirianaFranzese_app/index.html'))
    );
    return;
  }

  // For all other requests, use cache first, then fall back to network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
