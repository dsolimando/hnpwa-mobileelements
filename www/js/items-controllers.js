class ItemsController {

    constructor(url) {
        this.$el = document.createElement('div')

        this.loading = false
        this.loadData(url)
        this.page = 0
        this.pageSize = 30;
        
        this.pushNavigator = new PushNavigator()

        this.$el.onscroll = event => {
            if( this.$el.scrollTop + window.screen.height  >= this.$el.scrollHeight ) {
                this.loadData(`${url}?page=${this.page}`)
            }
        }

        this.$el.onclick = event => {
            const $item = event.target.closest('hn-item')
            setTimeout( _ => {
                this.pushNavigator.push({
                    viewController:CommentsController,
                    props: {
                        title:'Comments',
                        itemId: $item.id
                    }
                })
            },250)
        }
    }

    render() {
        return this.$el
    }

    async loadData(url) {
        if (this.loading) return
        this.loading = true
        const response = await fetch(url)
        const results = await response.json()
        let i = 1
        let that = this
        results.forEach ( result => {
            const hnItem = document.createElement('hn-item')
            hnItem.index = ((this.page)*this.pageSize)+(i++)
            hnItem.id = result.id
            hnItem.title = result.title
            hnItem.points = result.points
            hnItem.by = result.user
            hnItem.since = result.time_ago
            hnItem.commentsCount = result.comments_count
            that.$el.appendChild(hnItem)
        })
        this.page++
        this.loading = false
    }
}

class NewsController extends ItemsController {
    constructor() {
        super("https://node-hnapi.herokuapp.com/newest")
    }    
}

class TopController extends ItemsController {
   constructor() {
        super("https://node-hnapi.herokuapp.com/news")
    }  
}

class ShowController extends ItemsController {
   constructor() {
        super("https://node-hnapi.herokuapp.com/show")
    }  
}

class AskController extends ItemsController {
   constructor() {
        super("https://node-hnapi.herokuapp.com/ask")
    }  
}

class JobsController extends ItemsController {
   constructor() {
        super("https://node-hnapi.herokuapp.com/jobs")
    }  
}