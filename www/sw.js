const openCache = caches.open('hn-vanilla-custom-elements');

const version = 2.7

const cachedFiles = [
    '/',
    '/lib/tabbar.html',
    '/lib/routing.js',
    '/lib/view-controller.html',
    '/lib/navigation-bar.html',
    '/lib/navigation-bar.js',
    '/lib/zone-navigator.html',
    '/lib/push-navigator.js',
    '/lib/webcomponents-loader.js',
    '/lib/webcomponents-hi-sd-ce.js',
    '/item.html',
    '/pager.html',
    '/js/items-controllers.js',
    '/comment.html',
    '/js/comments-controller.js',
]

self.addEventListener('install', event => {
    event.waitUntil(
        openCache.then(cache => cache.addAll(cachedFiles))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then( response => {
            if (event.request.url.startsWith('https://node-hnapi.herokuapp.com')) {
                return fetch(event.request).catch( error => response)
            } else {
                return response || fetch(event.request);
            }   
        })
    );
});