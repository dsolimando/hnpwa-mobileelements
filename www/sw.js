const openCache = caches.open('hn-vanilla-custom-elements');

const version = 1.15

const cachedFiles = [
    '/',
    '/lib/tabbar.html',
    '/lib/view-controller.html',
    '/lib/navigation-bar.html',
    '/lib/navigation-bar.js',
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
    console.log('activate')
    event.waitUntil(caches.keys().then( key => {
        return caches.delete(key)
    }))
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then( response => {
            if (event.request.url.startsWith('https://node-hnapi.herokuapp.com')) {
                return fetch(event.request).then ( netResponse => {
                    if (netResponse.status != 200)
                        return response
                    else {
                        cache => { cache.put(event.request,netResponse.clone())}
                        return netResponse
                    }
                })
            } else {
                return response || fetch(event.request);
            }   
        })
    );
});