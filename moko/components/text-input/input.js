import template from './input.html'
import searchIconSvg from './search-icon.svg'

const $template = document.createElement('template')
$template.innerHTML = template

class TextInput extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild($template.content.cloneNode(true))
  }

  connectedCallback() {
    const icon = this.getAttribute('icon') || ''

    if (icon && icon == 'search') {
      const color = getComputedStyle(this).color
      this.shadowRoot
        .querySelector('label')
        .style.setProperty(
          '--icon-svg',
          `url("data:image/svg+xml,${encodeURI(
            searchIconSvg.replace('currentColor', color)
          )}`
        )
    }
  }

  get value() {
    return this.shadowRoot.querySelector('input').value
  }
}

customElements.define('moko-text-input', TextInput)

export default TextInput
