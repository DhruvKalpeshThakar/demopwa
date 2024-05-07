const CACHE_NAME = "version-1";
const urlsTOCache = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/static/js/bundle.js",
  // Add other assets and routes to cache
];

const self = this;

// install server worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("opened cache");
      return cache.addAll(urlsTOCache);
    })
  );
});

// listen to requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("./offline.html"));
    })
  );
});

// Activate the service worker

self.addEventListener("activate", (event) => {
  const cacheWhileList = [];
  cacheWhileList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhileList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});