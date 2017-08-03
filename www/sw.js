const openCache = caches.open('hn-vanilla-custom-elements');

const version = 1.8

const cachedFiles = [
    '/',
    '/index.html',
    '/lib/tabbar.html',
    '/lib/view-controller.html',
    '/lib/navigation-bar.html',
    '/lib/zone-navigator.html',
    '/lib/push-navigator.js',
    '/lib/webcomponents-loader.js',
    '/lib/webcomponents-hi-sd-ce.js',
    '/item.html',
    '/js/items-controllers.js',
    '/comment.html',
    '/js/comments-controller.js',
]

self.addEventListener('install', event => {
    event.waitUntil(
        openCache.then(cache => cache.addAll(cachedFiles))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(caches.keys().then( key => {
        return caches.delete(key)
    }))
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});