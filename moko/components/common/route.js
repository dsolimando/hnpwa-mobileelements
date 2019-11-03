export class MokoRoute extends HTMLElement {
  static get observedAttributes() {
    return ['path', 'component', 'selected']
  }

  /**
   * @param {string} path:
   */
  removeFirstSlash(path) {
    return path.indexOf('/') === 0 ? path.substring(1) : path
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'path') {
      this._path = this.removeFirstSlash(newVal)
    } else if (name === 'component') {
      if (!this._element) this._element = newVal
    } else if (name === 'selected') {
      this._selected = newVal
    }
  }

  get path() {
    return this._path
  }

  get customElement() {
    return this._element
  }

  set path(path) {
    this.setAttribute('path', path)
  }

  get selected() {
    return this._selected
  }

  set selected(selected) {
    this.setAttribute('selected', selected)
  }
}

customElements.define('moko-route', MokoRoute)
