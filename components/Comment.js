import { customElement } from 'https://cdn.jsdelivr.net/npm/@solidx/moko@2.0.6/components/common/builder.min.js'

const template = (user, since, content) => `
<div class="header">${headerTemplate(user, since)}</div>
<div class="content">${content}</div>
<div class="children"></div>
`

const headerTemplate = (user, since) => `
    <span><b>${user}</b></span>&nbsp;&nbsp;<span>${since}</span>&nbsp;&nbsp;<span id="minus">➖</span>
`

const Comment = customElement(
  function() {
    const $fragment = document.createElement('div')
    $fragment.innerHTML = template(
      this.comment.user,
      this.comment.time_ago,
      this.comment.content
    )

    $fragment.style.paddingLeft = 10 + 2 * this.level + 'px'

    const $children = $fragment.querySelector('.children')
    const $content = $fragment.querySelector('.content')

    if (this.comment.comments && Array.isArray(this.comment.comments)) {
      this.comment.comments.forEach(comment => {
        const $comment = document.createElement('hn-comment')
        $comment.expended = true
        $comment.comment = comment
        $children.appendChild($comment)
      })
    }

    $fragment.onclick = event => {
      if (!event.target.matches('#minus')) return

      if (this.expended === 'true') {
        $content.style.display = 'none'
        $children.style.display = 'none'
        this.expended = false
        event.target.innerText = '➕'
      } else {
        $content.style.display = null
        $children.style.display = null
        this.expended = true
        event.target.innerText = '➖'
      }
    }

    return $fragment
  },
  ['expended']
)

customElements.define('hn-comment', Comment)
