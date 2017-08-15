const $scellView = document.querySelector('scell-view > div')
$scellView.style.visibility = 'hidden'

const init = _ => {
    if (document.readyState != 'complete') {
        setTimeout(init,5)
    } else {
        const znavigator = document.querySelector('scell-zone-navigator')
        Object.assign(znavigator,urlRouting)
        znavigator.handleUrlRouting({
            'top/:page':TopController,
            'new/:page':NewsController,
            'show/:page':ShowController,
            'ask/:page':AskController,
            'jobs/:page':JobsController
        })

        const pushNavigator = new PushNavigator()
        Object.assign(pushNavigator,urlRouting)
        pushNavigator.handleUrlRouting({
            'comment/:id':CommentsController
        })

        const tabbar = document.querySelector('scell-tab-bar')

        if (!location.hash) {
            new TopController({
                '\$el':document.querySelector('scell-view > div')
            })
            $scellView.style.visibility = 'visible'
            tabbar.setActiveByTabName('top')
        } else {
            tabbar.setActiveByTabName(location.hash.slice(1).split('/')[0])
            dispatchEvent(new CustomEvent('hashchange'))
        }

        tabbar.addEventListener('scell-tab-selected', data => {
            location.hash = data.detail.name+"/1"
        })

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
        }
    }
}

if (!('import' in document.createElement('link'))) {
    window.addEventListener('WebComponentsReady', _ => {
        init()
    });
} else {
    init()
}