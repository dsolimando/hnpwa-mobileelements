const itemTemplate = result => `
<hn-item 
    index="${result.index}"
    title="${result.title}"
    points="${result.points}"
    by="${result.user}"
    comments-count="${result.comments_count}">
</hn-item>
`

class ItemsController {

    constructor(url) {
        this.$el = document.createElement('div')

        this.loading = false
        this.loadData(url)
        this.page = 0
        this.pageSize = 30;
        
        this.$el.onscroll = event => {
            if( this.$el.scrollTop + window.screen.height  >= this.$el.scrollHeight ) {
                this.loadData(`${url}?page=${this.page++}`)
            }
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
        this.loading = false
        let i = 0
        results.forEach ( result => {
            result.index = ((this.page)*this.pageSize)+(i++)
            this.$el.insertAdjacentHTML('beforeend',itemTemplate(result))
        })
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