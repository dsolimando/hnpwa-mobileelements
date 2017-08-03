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
            if (event.target.matches('scell-navigation-bar span')) {
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
        
        const hnItem = document.createElement('hn-item')
        hnItem.title = response.title
        hnItem.points = response.points
        hnItem.by = response.user
        hnItem.since = response.time_ago
        hnItem.commentsCount = response.comments_count

        $container.appendChild(hnItem)

        hnItem.shadowRoot.querySelector('span').remove()

        response.comments.forEach (comment => {
            const $comment = document.createElement('hn-comment')
            $comment.comment = comment
            $container.appendChild($comment)
        })       
    } 

    render() {
        return this.$el
    }
}