const CACHE_NAME = 'xiocoin-cache-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/logo.png',
    '/src/main.jsx',
    // add other assets you want cached
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(resp => resp || fetch(event.request))
    );
});
