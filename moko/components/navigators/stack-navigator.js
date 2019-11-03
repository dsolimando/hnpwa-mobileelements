import '../common/route.js'
import '../common/link.js'
import { NavigatorElement } from '../common/navigator-element.js'

/**
 * @param {string} id
 * @return {HTMLDivElement}
 */
function createWrapperElement(id) {
  const wrapperElement = document.createElement('div')
  wrapperElement.style.position = 'absolute'
  wrapperElement.style.width = 'inherit'
  wrapperElement.style.height = 'inherit'
  wrapperElement.style.overflow = 'hidden'
  wrapperElement.style.transition =
    'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)'
  id && wrapperElement.setAttribute('id', id)
  return wrapperElement
}

export class StackNavigator extends NavigatorElement {
  static get observedAttributes() {
    return ['modal']
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'modal') {
      if (!this.modal) this._modal = !!(newVal === '' || newVal)
    }
  }

  get modal() {
    return this._modal
  }

  setUrlData(element) {
    if (this.urlData) {
      Object.keys(this.urlData).forEach(key => {
        element.setAttribute(key, this.urlData[key])
      })
    }
  }

  handleEvent(event) {
    const {
      matchedResult,
      routeChanged,
      matchedRoute
    } = this.searchMatchingRoute()

    // Route always in the dom but empty route => display back initialContentElement
    if (!matchedResult && this.nextRoute) {
      this.onscreenFirstRoute()
    }

    if (matchedResult && routeChanged) {
      const element = document.createElement(matchedRoute.customElement)
      element.style.display = 'block'

      this.setUrlData(element)

      this.nextRoute = createWrapperElement()
      this.nextRoute.innerHTML = ''
      this.nextRoute.appendChild(element)
      this.offscreenNextRoute()

      setTimeout(() => {
        this.appendChild(this.nextRoute)
        setTimeout(() => {
          if (!this.modal)
            this.initialContentElement.style.transform = 'translateX(-30%)'
          this.showNextRouteElement(element)
        }, 16)
      })
    }
  }

  offscreenNextRoute() {
    if (this.modal) {
      this.nextRoute.style.transform = 'translateY(100%)'
    } else {
      this.nextRoute.style.transform = 'translateX(100%)'
    }
    setTimeout(() => this.nextRoute.remove, 500)
  }

  onscreenFirstRoute() {
    if (!this.modal) {
      this.nextRoute.style.transform = 'translateX(100%)'
      this.initialContentElement.style.transform = 'translateX(0)'
    } else {
      this.nextRoute.style.transform = 'translateY(100%)'
    }
  }

  showNextRouteElement() {
    if (this.modal) {
      this.nextRoute.style.transform = 'translateY(0)'
    } else {
      this.nextRoute.style.transform = 'translateX(0)'
    }
  }

  renderFirstRoute() {
    const element = document.createElement(this.routes[0].customElement)
    this.setUrlData(element)
    element.style.display = 'block'
    const wrapper = createWrapperElement()
    wrapper.appendChild(element)

    this.initialContentElement
      ? this.initialContentElement.replaceWith(wrapper)
      : this.appendChild(wrapper)
    this.initialContentElement = wrapper
  }

  constructor() {
    super()
    this.connectedCallbackNumCalls = 0
    this.style.position = 'relative'
    this.style.height = 'inherit'
    this.style.width = 'inherit'
    this.style.display = 'block'
    this.style.overflow = 'hidden'
  }

  connectedCallback() {
    super.connectedCallback()
    this.initialContentElement = this.getContentElement()
    if (this.connectedCallbackNumCalls++ === 0) {
      setTimeout(() => {
        this.matchedRouteLocation =
          this.getAttribute('default-path') || this.routes[0].path
        this.renderFirstRoute()
      })
    }
  }
}

customElements.define('moko-stack-navigator', StackNavigator)
