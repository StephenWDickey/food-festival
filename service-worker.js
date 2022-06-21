// we need these variables for service worker
const APP_PREFIX = "FoodFest-";
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;



// we must create an array with the files we want to cache
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    // these are our compressed js files
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];



// we add event listener to install service worker
// we don't use window.addEventListener because
// service workers run before the window object is created
// thus we use self.addEventListener
self.addEventListener('install', function (e) {
    // we say wait until service worker finishes installing
    // before it is terminated
    e.waitUntil(
        // we find cache by name, then add our files
        // in our cache array
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache: ' + CACHE_NAME)
            return cache.addAll (FILES_TO_CACHE)
        })
    )
});

// we must create an eventListener for activation of
// the service worker
self.addEventListener('activate', function (e) {
    e.waitUntil(
        // keys() returns array of cache names
        // we name the array keyList
        caches.keys().then(function (keyList) {
            // we store our filtered caches in cacheKeeplist array
            let cacheKeeplist = keyList.filter(function (key) {
                // we are interested in caches that have the prefix
                // for our app, which is FoodFest
                return key.indexOf(APP_PREFIX);
            });
            // we push the cache to the array
            cacheKeeplist.push(CACHE_NAME);

            // if cache is not in keyList it will get value of -1
            // these caches will be deleted
            return Promise.all(
                keyList.map(function(key, i) {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        console.log('deleting cache: ' + keyList[i]);
                        return caches.delete(keyList[i]);
                    }
                })
            );
        })
    );
});



// we must add an eventListener for retrieving info from cache
self.addEventListener('fetch', function(e) {
    console.log('fetch request : ' + e.request.url)
    // respondWith method will deliver resource
    e.respondWith(
        // we check cache to see if our requested 
        // resource is stored
        caches.match(e.request).then(function(request) {
            // if requested resource is in cache
            // it is returned to us
            if(request) {
                console.log('responding with cache : ' + e.request.url)
                return request
            }
            // if requested resource is not in cache
            // then we fetch it via online network
            else {
                console.log('file not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            }
        })
    )
});


// remember we will be able to use service worker
// with https or localhost 8080