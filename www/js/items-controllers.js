class ItemsController {

    constructor(props) {
        this.props = props
        this.$el = document.createElement('div')

        this.loading = false
        
        this.page = 0
        this.pageSize = 30;

        if (this.props.data)
            this.createElements(this.props.data)
        else
            this.loadData(this.props.url)
        
        this.pushNavigator = new PushNavigator()

        this.$el.onscroll = event => {
            if( this.$el.scrollTop + window.screen.height  >= this.$el.scrollHeight ) {
                this.loadData(`${this.props.url}?page=${this.page}`)
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

    createElements(results) {
        let i = 1
        results.forEach ( result => {
            const hnItem = document.createElement('hn-item')
            hnItem.index = ((this.page)*this.pageSize)+(i++)
            hnItem.id = result.id
            hnItem.title = result.title
            hnItem.points = result.points
            hnItem.by = result.user
            hnItem.since = result.time_ago
            hnItem.commentsCount = result.comments_count
            this.$el.appendChild(hnItem)
        })
        this.page++
    }

    loadData(url) {
        if (this.loading) return
        this.loading = true

        fetch(url).then( resp => { resp.json().then( results => {
            setTimeout( _ => {
                this.createElements(results)                
                this.loading = false
            },200)
        })})
    }
}

class NewsController extends ItemsController {
    constructor(props) {
        props.url = "https://node-hnapi.herokuapp.com/newest"
        super(props)
    }    
}

class TopController extends ItemsController {
   constructor(props) {
       props.url = "https://node-hnapi.herokuapp.com/news"
       super(props)
    }  
}

class ShowController extends ItemsController {
   constructor(props) {
        props.url = "https://node-hnapi.herokuapp.com/show"
        super(props)
    }  
}

class AskController extends ItemsController {
   constructor(props) {
        props;url = "https://node-hnapi.herokuapp.com/ask"
        super(props)
    }  
}

class JobsController extends ItemsController {
   constructor(props) {
        props.url = "https://node-hnapi.herokuapp.com/jobs"
        super(props)
    }  
}