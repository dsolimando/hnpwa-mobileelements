const commentsViewTemplate = barTitle => `
    <scell-view id="comments-view" transition="cover-vertical">
        <scell-navigation-bar title="${barTitle}">
            <span>✖️</span>
        </scell-navigation-bar>
        <div id="comments-container"></div>
    </scell-view>
`

class CommentsController {

    constructor(props) {
        this.props = props
        const $div = document.createElement('div')
        $div.innerHTML = commentsViewTemplate(props.title)
        this.$el = $div.querySelector('scell-view')
        this.loadData()

        this.$el.onclick = event => {
            if (event.target.matches('scell-navigation-bar > span')) {
                this.$el.hide()
                setTimeout( _ => {
                    this.$el.remove()
                },200)
            }
        }
    }

    async loadData() {
        const data = await fetch(`https://node-hnapi.herokuapp.com/item/${this.props.itemId}`)
        const response = await data.json()
        const $container = this.$el.querySelector('#comments-container')
        
        $container.insertAdjacentHTML('beforeend',`<hn-item 
            title="${response.title}"
            points="${response.points}"
            by="${response.user}"
            since="${response.time_ago}"
            comments-count="${response.comments_count}"
        />`)

        response.comments.forEach (comment => {
            const $comment = document.createElement('hn-comment')
            $comment.comment = comment
            $container.insertAdjacentElement('beforeend',$comment)
        })       
    } 

    render() {
        return this.$el
    }
}