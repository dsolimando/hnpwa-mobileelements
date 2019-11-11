import { customElement } from './builder.js'

export const Link = customElement(
  function() {
    const $content = this.innerHTML
    const $a = document.createElement('a')
    $a.href = this.to
    $a.innerHTML = $content
    $a.onclick = event => {
      event.preventDefault()
      event.stopPropagation()
      const parentNavigator = this.closest(
        'moko-switch-navigator, moko-stack-navigator',
        'moko-tab-navigator'
      )
      parentNavigator.navigate(this.to)
    }
    this.innerHTML = ''
    return $a
  },
  ['to']
)

customElements.define('moko-link', Link)
