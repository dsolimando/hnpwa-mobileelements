const tabBarTemplate = document.createElement('template')
tabBarTemplate.innerHTML = `<slot></slot>
<style>
    :host {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        display: flex;
        background: #fff;
        padding-bottom: env(safe-area-inset-bottom);
    }

    ::slotted(moko-tab) {
        align-self: center;
        flex-grow: 1;
        text-align: center;
        cursor: pointer;
        display: flex;
        flex-direction: column;
    }
</style>`

const tabTemplate = document.createElement('template')
tabTemplate.innerHTML = `<slot><!-- ICON SLOT --></slot>
<span><!-- title --></span>

<style>
    ::slotted(moko-icon) {
        flex-grow: 1;
        height: 18px;
        padding-bottom: 5px;
    }
    span {
        flex-grow: 1;
    }
</style>`

if (window.ShadyCSS) {
  ShadyCSS.prepareTemplate(tabBarTemplate, 'moko-tab-bar')
  ShadyCSS.prepareTemplate(tabTemplate, 'moko-tab')
}

export class Tab extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'name']
  }

  attributeChangedCallback(name, oldval, newVal) {
    switch (name) {
      case 'title':
        this._title = newVal
        break
      case 'name':
        this._name = newVal
        break
    }
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(tabTemplate.content.cloneNode(true))
  }

  connectedCallback() {
    if (window.ShadyCSS) ShadyCSS.styleElement(this)

    const $span = this.shadowRoot.querySelector('span')
    if (this.getAttribute('title')) {
      $span.innerHTML = this.getAttribute('title')
    }

    const mokoIcon = this.querySelector('moko-icon')
    if (mokoIcon) {
      $span.style.fontSize = '0.7em'
    }
  }

  get name() {
    return this._name
  }

  get title() {
    return this._title
  }

  set name(name) {
    this.setAttribute('name', name)
  }

  set title(title) {
    this.setAttribute('title', title)
  }
}
customElements.define('moko-tab', Tab)

export class TabBar extends HTMLElement {
  static get observedAttributes() {
    return ['active-color']
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'active-color':
        this._activeColor = newVal
        break
    }
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(tabBarTemplate.content.cloneNode(true))
  }

  resetActiveColorForTabs() {
    Array.prototype.forEach.call(this.querySelectorAll('moko-tab'), elem => {
      elem.style.color = null
    })
  }

  connectedCallback() {
    if (window.ShadyCSS) ShadyCSS.styleElement(this)

    this.onclick = event => {
      const $source = event.target.closest('moko-tab')
      if ($source) {
        const name = $source.getAttribute('name')
        this.resetActiveColorForTabs()
        $source.style.color = this.getAttribute('active-color')
        this.dispatchEvent(
          new CustomEvent('moko-tab-selected', { detail: { name } })
        )
      }
    }
  }

  get activeColor() {
    return this._activeColor || '#A06CD5'
  }

  set activeColor(color) {
    this.setAttribute('active-color', color)
  }

  set selected(name) {
    this._currentTabSelected = this.querySelector(`moko-tab[name="${name}"]`)
    this._currentTabSelected.style.color = this.activeColor
  }

  get currentTabSelected() {
    return this._currentTabSelected
  }
}

customElements.define('moko-tab-bar', TabBar)
