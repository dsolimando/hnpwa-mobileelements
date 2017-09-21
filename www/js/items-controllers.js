class ItemsController {

    constructor(props) {
        this.props = props

        this.page = this.props.page || this.props.urlData ? this.props.urlData.page : 1
        this.pageSize = 30;

        if (this.props.$el) {
            this.$el = this.props.$el
            this.$pager = document.querySelector('hn-pager')
        } else {
            this.$df = document.createDocumentFragment()
            this.$el = document.createElement('div')
            this.$df.appendChild(this.$el)
            
            this.$pager = document.createElement('hn-pager')
            this.$pager.setAttribute('page',this.page)
            this.$pager.setAttribute('baseUrl',this.props.baseUrl)

            this.$df.appendChild(this.$pager)

            if (this.props.data)
                this.createElements(this.props.data)
            else if (this.props.url)
                this.loadData(`${this.props.url}?page=${this.page}`)
        }
        
        this.$el.addEventListener('item.comment.click', event => {
            const $item = event.target
            location.hash = location.hash+'/comment/'+$item.id
        })

        this.$el.addEventListener('item.link.click', event => {
            open(event.target.getAttribute('url'),'_blank')
        })

        this.$el.onscroll = event => {
            if( this.$el.scrollTop + window.screen.height  >= this.$el.scrollHeight ) {
                this.$pager.classList.add('bottom-plus')
            } else {
                this.$pager.classList.remove('bottom-plus')
            }
        }
    }

    render() {
        return this.$df
    }

    createElements(results) {
        let i = 1
        results.forEach ( result => {
            const hnItem = document.createElement('hn-item')
            hnItem.index = ((this.page-1)*this.pageSize)+(i++)
            hnItem.id = result.id
            hnItem.title = result.title
            hnItem.points = result.points
            hnItem.url = result.url
            hnItem.by = result.user
            hnItem.since = result.time_ago
            hnItem.commentsCount = result.comments_count
            this.$el.appendChild(hnItem)
        })
    }

    loadData(url) {
        fetch(url).then( resp => { resp.json().then( results => {
            setTimeout( _ => {
                this.createElements(results)                
            },200)
        })})
    }
}

class NewsController extends ItemsController {
    constructor(props) {
        props.url = "https://node-hnapi.herokuapp.com/newest"
        props.baseUrl = '#new'
        super(props)
    }    
}

class TopController extends ItemsController {
   constructor(props) {
       props.url = "https://node-hnapi.herokuapp.com/news"
       props.baseUrl = '#top'
       super(props)
    }  
}

class ShowController extends ItemsController {
   constructor(props) {
        props.url = "https://node-hnapi.herokuapp.com/show"
        props.baseUrl = '#show'
        super(props)
    }  
}

class AskController extends ItemsController {
   constructor(props) {
        props.url = "https://node-hnapi.herokuapp.com/ask"
        props.baseUrl = '#ask'
        super(props)
    }  
}

class JobsController extends ItemsController {
   constructor(props) {
        props.url = "https://node-hnapi.herokuapp.com/jobs"
        props.baseUrl = '#jobs'
        super(props)
    }  
}