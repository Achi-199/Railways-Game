const VERSION = 'v1';
const CACHE_NAME = `railways-cache-${VERSION}`;
const ASSETS = [
  '/',
  'index.html',
  'styles.css',
  'script.js',
  'pics/screens/solution.png',
  'pics/screens/thumbnail.png',
  'pics/tiles/bridge.png',
  'pics/tiles/bridge_rail.png',
  'pics/tiles/curve_rail.png',
  'pics/tiles/empty.png',
  'pics/tiles/mountain.png',
  'pics/tiles/mountain_rail.png',
  'pics/tiles/straight_rail.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('railways-cache-') && k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(resp => {
        const respClone = resp.clone();
        if (resp.ok && request.url.startsWith(self.location.origin)) {
          caches.open(CACHE_NAME).then(cache => cache.put(request, respClone));
        }
        return resp;
      });
    })
  );
});
