import icons from './feather-sprite.svg'
import template from './icon.html'

const iconsTemplate = document.createElement('template')
iconsTemplate.innerHTML = icons

const svgTemplate = content => `
<svg viewBox="0 0 24 24">
    ${content}
</svg>
`

class MokoIcon extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    const icon = this.getAttribute('name') || ''
    if (icon) {
      this.shadowRoot.innerHTML =
        svgTemplate(iconsTemplate.content.querySelector(`#${icon}`).innerHTML) +
        template
    }
  }
}

customElements.define('moko-icon', MokoIcon)

export default MokoIcon
