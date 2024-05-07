let cacheData = "version-1";
let urlsTOCache = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/static/js/bundle.js",
  "/users",
  "/logo192.png",
  "/favicon.ico",
];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll(urlsTOCache)
    })
  )
})

this.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {

    event.respondWith(
      caches.match(event.request).then((response) => {
        
        return response || fetch(event.request);



        // let requestUrl = event.request.clone();
        // return fetch(requestUrl);
      })
    );
  }

});