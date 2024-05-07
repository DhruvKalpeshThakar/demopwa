let cacheData = "version-1";
let urlsTOCache = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/static/js/bundle.js",
];

this.addEventListener("install",(event) =>{
  event.waitUntil(
    caches.open(cacheData).then((cache) =>{
      cache.addAll(urlsTOCache)
    })
  )
})

this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});