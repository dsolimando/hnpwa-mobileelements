import '../common/route.js'
import '../common/link.js'
import { NavigatorElement } from '../common/navigator-element.js'

export class MokoSwitchNavigator extends NavigatorElement {
  connectedCallback() {
    super.connectedCallback()
    this.style.display = 'block'
    this.style.height = 'inherit'
    this.style.width = 'inherit'
    this.style.position = 'relative'

    const defaultPath = this.getAttribute('default-path')

    if (this.getContentElement()) {
      this.matchedRouteLocation = defaultPath || this.routes[0].path
    } else {
      if (this.getCurrentRelativeLocation()) {
        setTimeout(() => this.handleEvent())
      } else {
        this.navigate(defaultPath || this.routes[0].path)
      }
    }
  }

  handleEvent() {
    const {
      matchedResult,
      matchedRoute,
      routeChanged
    } = this.searchMatchingRoute()

    // Update zone content with route's associated custom element
    if (matchedResult && routeChanged) {
      Array.from(this.routes).forEach(route => (route.innerHTML = ''))

      const $content = this.getContentElement()
      $content && $content.remove()

      const element = document.createElement(matchedRoute.customElement)

      Object.keys(this.urlData).forEach(key => {
        element.setAttribute(key, matchedResult.urlData[key])
      })
      this.appendChild(element)

      this.dispatchEvent(
        new CustomEvent('moko-switch-view', {
          detail: { matchedRoute },
          bubbles: true
        })
      )
    }
  }
}

customElements.define('moko-switch-navigator', MokoSwitchNavigator)
