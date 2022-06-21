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


// remember we will be able to use service worker
// with https or localhost 8080