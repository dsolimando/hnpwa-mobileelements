const openCache = caches.open('hn-vanilla-custom-elements');

self.addEventListener('install', event => {
    event.waitUntil(
        openCache.then(cache => cache.addAll([
            '/',
            '/index.html',
            '/lib/tabbar.html',
            '/lib/view-controller.html',
            '/lib/navigation-bar.html',
            '/lib/zone-navigator.js',
            '/lib/push-navigator.js',
            '/item.html',
            '/js/items-controllers.js',
            '/comment.html',
            '/js/comments-controller.js',
        ]))
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});