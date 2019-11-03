import drawerTemplateString from './drawer.html'

const drawerTemplate = document.createElement('template')
drawerTemplate.innerHTML = drawerTemplateString

class Drawer extends HTMLElement {
  constructor() {
    super()
    const $shadowRoot = this.attachShadow({ mode: 'open' })
    $shadowRoot.appendChild(drawerTemplate.content.cloneNode(true))
    this.aside = $shadowRoot.querySelector('aside')
    this.backgroundCache = $shadowRoot.querySelector('.background-cache')
  }

  connectedCallback() {
    this.aside.style.width = this.getAttribute('width')
    this.aside.style.transform = 'translateX(-100%)'
    this.backgroundCache.style.opacity = 0
    this.style.display = ' none'
    this.backgroundCache.addEventListener('click', () => {
      this.close()
    })
  }

  open() {
    this.style.display = ''
    setTimeout(_ => {
      this.aside.style.transform = 'translateX(-1px)'
      this.backgroundCache.style.opacity = 0.3
    }, 32)
  }

  close() {
    setTimeout(_ => {
      this.aside.style.transform = 'translateX(-100%)'
      this.backgroundCache.style.opacity = 0
      setTimeout(_ => {
        this.style.display = 'none'
      }, 500)
    }, 32)
  }
}

customElements.define('moko-drawer', Drawer)
