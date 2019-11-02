import { customElement } from 'https://cdn.jsdelivr.net/npm/@solidx/moko@2.0.6/components/common/builder.js'
import 'https://cdn.jsdelivr.net/npm/@solidx/moko@2.0.6/dist/navigation-bar.min.js'

import './Comment.js'

const CommentsScreen = customElement(
  async ce => {
    try {
      const $fragment = document.createDocumentFragment()

      const response = await fetch(
        `https://node-hnapi.herokuapp.com/item/${ce.itemId}`
      )
      const data = await response.json()

      const $navigationBar = document.createElement('moko-navigation-bar')
      $navigationBar.setAttribute('title', 'Comments')
      $navigationBar.setAttribute('back-title', 'Close')
      $navigationBar.addEventListener('back-click', event => {
        history.back()
      })

      $fragment.appendChild($navigationBar)

      const $hnItem = document.createElement('hn-item')
      $hnItem.style.paddingTop = '80px'
      $hnItem.title = data.title
      $hnItem.index = ''
      $hnItem.points = data.points
      $hnItem.by = data.user
      $hnItem.since = data.time_ago
      $hnItem.url = data.url
      $hnItem.commentsCount = data.comments_count
      $hnItem.onclick = event =>
        open(event.target.getAttribute('url'), '_blank')

      $fragment.appendChild($hnItem)

      const $comments = document.createElement('div')
      $comments.style.overflow = 'auto'
      $comments.style.height = '98%'
      $fragment.appendChild($comments)

      data.comments.forEach(comment => {
        const $comment = document.createElement('hn-comment')
        $comment.expended = true
        $comment.comment = comment
        $comments.appendChild($comment)
      })

      return $fragment
    } catch (e) {
      return '<span>Error</span>'
    }
  },
  ['itemId']
)

customElements.define('hn-comments-screen', CommentsScreen)
