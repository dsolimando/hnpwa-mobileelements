const openCache = caches.open('hn-moko')

const version = 3.0

const cachedFiles = [
  './',
  './components/Comment.js',
  './components/CommentsScreen.js',
  './components/Item.js',
  './components/ItemList.js',
  './components/navigators.js',
  './components/Pager.js',
  'https://cdn.jsdelivr.net/npm/@solidx/moko@2.0.6/dist/icon.min.js',
  'https://cdn.jsdelivr.net/npm/@solidx/moko@2.0.6/dist/moko-navigators.min.js',
  'https://cdn.jsdelivr.net/npm/@solidx/moko@2.0.6/components/common/builder.js',
  'https://cdn.jsdelivr.net/npm/@solidx/moko@2.0.6/dist/navigation-bar.min.js'
]

self.addEventListener('install', event => {
  event.waitUntil(openCache.then(cache => cache.addAll(cachedFiles)))
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (event.request.url.startsWith('https://node-hnapi.herokuapp.com')) {
        return fetch(event.request).catch(error => response)
      } else {
        return response || fetch(event.request)
      }
    })
  )
})
