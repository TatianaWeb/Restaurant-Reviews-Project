const CACHE_NAME = 'my-site-cache-v1';

const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(cacheFiles);
      })
    );
});

self.addEventListener('fetch', function(e) {
    event.respondWith(
      caches.match(e.request)
        .then(function(response) {
          // resource is in the cache
          if (response) {
            return response;
          }
  
          // clone the request for future using
          var fetchRequest = e.request.clone();
  
          return fetch(fetchRequest).then(
            function(response) {
              // check the response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // clone the response
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(e.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });