export const customElement = (render, attributes = []) => {
  const clazz = class extends HTMLElement {
    static get observedAttributes() {
      return [...attributes]
    }

    constructor() {
      super()
      this.connectedCallbackNumCalls = 0
    }

    async connectedCallback() {
      if (this.connectedCallbackNumCalls > 0) {
        return
      }
      const bindedRender = render.bind(this)
      this.toRender = await bindedRender(this)
      if (typeof this.toRender === 'string') {
        this.innerHTML = this.toRender
      } else if (
        this.toRender instanceof HTMLElement ||
        this.toRender instanceof DocumentFragment
      ) {
        this.appendChild(this.toRender)
      }
      this.connectedCallbackNumCalls++
    }
  }

  attributes.forEach(attr => {
    Object.defineProperty(clazz.prototype, attr, {
      set(v) {
        this.setAttribute(attr, v)
      },
      get() {
        return this.getAttribute(attr)
      }
    })
  })

  return clazz
}
