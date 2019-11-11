import navTemplateString from './navigation-bar.html'

const navTemplate = document.createElement('template')
navTemplate.innerHTML = navTemplateString

export class NavigationBar extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(navTemplate.content.cloneNode(true))
  }

  get leftSlotAssignedNode() {
    return this.shadowRoot.querySelectorAll('slot')[0].assignedNodes()[0]
  }

  get rightSlotAssignedNode() {
    const slots = this.shadowRoot.querySelectorAll('slot')[1].assignedNodes()[0]
  }

  connectedCallback() {
    if (window.ShadyCSS) ShadyCSS.styleElement(this)

    this.$title = this.shadowRoot.querySelector('.center-zone > span')
    this.$title.innerText = this.getAttribute('title') || 'Title'

    this.$backTitle = this.shadowRoot.querySelector('.back-zone > span')
    this.$backTitle.innerText = this.getAttribute('back-title') || ''

    this.backZone = this.shadowRoot.querySelector('.back-zone')

    if (this.backZone && this.navigator && this.navigator.pop) {
      this.backZone.onclick = event => {
        this.navigator.pop()
      }
    }

    if (this.getAttribute('anim-back-title')) {
      this.$backTitle.style.transform = 'translateX(50px)'
    }

    this.backZone.onclick = event => {
      this.dispatchEvent(new CustomEvent('back-click'))
    }
  }

  render() {
    setTimeout(_ => {
      this.$title.style.opacity = 1
      this.$backTitle.style.opacity = 1

      if (this.getAttribute('anim-back-title')) {
        this.$backTitle.style.transform = 'translateX(0)'
      }
    })
  }
}

customElements.define('moko-navigation-bar', NavigationBar)
