const CACHE_NAME = 'ultracam-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style/reset.css',
  '/style/layout.css',
  '/style/camera.css',
  '/style/buttons.css',
  '/style/animations.css',
  '/style/pro-mode.css',
  '/style/responsive.css',
  '/scripts/main.js',
  '/scripts/camera-init.js',
  '/scripts/camera-controls.js',
  '/scripts/camera-photo.js',
  '/scripts/camera-video.js',
  '/scripts/camera-zoom.js',
  '/scripts/camera-focus.js',
  '/scripts/camera-switch.js',
  '/scripts/live-photo.js',
  '/scripts/pro-mode.js',
  '/scripts/ui-controls.js',
  '/scripts/gesture-controls.js',
  '/scripts/download-manager.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
