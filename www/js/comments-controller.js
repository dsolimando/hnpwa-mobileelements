const commentsViewTemplate = barTitle => `
    <scell-view id="comments-view" transition="cover-vertical">
        <scell-navigation-bar title="${barTitle}" back-title="Close">
        </scell-navigation-bar>
        <div id="comments-container"></div>
    </scell-view>
`

class CommentsController {

    constructor(props) {
        this.props = props
        const $div = document.createElement('div')
        $div.innerHTML = commentsViewTemplate("Comments")
        this.$el = $div.querySelector('scell-view')
        this.loadData()

        this.$el.querySelector('scell-navigation-bar').addEventListener('back-click', event => {
            history.back()
        })
        this.$el.onclick = event => {
            if (event.target.matches('hn-item')) {
                open(event.target.getAttribute('url'),'_blank')
            }
        }

        const onhashchange = event => {
            removeEventListener('hashchange',onhashchange)
            this.close()
        }
        addEventListener('hashchange', onhashchange)
    }

    close () {
        this.$el.hide()
        
        setTimeout( _ => {
            this.$el.remove()
        },200)
    }

    loadData() {
        
        const itemId = this.props.urlData.id
        const data = fetch(`https://node-hnapi.herokuapp.com/item/${itemId}`).then( data => {
            return data.json()
        }).then( response => {
            setTimeout(_ => {
                const $container = this.$el.querySelector('#comments-container')
                const hnItem = document.createElement('hn-item')
                hnItem.title = response.title
                hnItem.points = response.points
                hnItem.by = response.user
                hnItem.since = response.time_ago
                hnItem.url = response.url
                hnItem.commentsCount = response.comments_count

                $container.appendChild(hnItem)

                hnItem.shadowRoot.querySelector('span').remove()

                response.comments.forEach (comment => {
                    const $comment = document.createElement('hn-comment')
                    $comment.comment = comment
                    $container.appendChild($comment)
                })         
            },300)
        })
    } 

    render() {
        return this.$el
    }
}