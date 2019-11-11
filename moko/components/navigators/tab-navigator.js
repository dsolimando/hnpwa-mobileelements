import { NavigatorElement } from '../common/navigator-element.js'
import '../tab-bar/tab-bar.js'
import { MokoRoute } from '../common/route.js'

export class TabRoute extends MokoRoute {
  static get observedAttributes() {
    return [...MokoRoute.observedAttributes, 'title', 'icon']
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal)
    if (name === 'icon') {
      this._icon = newVal
    } else if (name === 'title') {
      this._title = newVal
    }
  }

  set title(title) {
    this.setAttribute('title', title)
  }

  set icon(icon) {
    this.setAttribute('icon', icon)
  }

  get title() {
    return this._title
  }

  get icon() {
    return this._icon
  }
}

customElements.define('moko-tab-route', TabRoute)

const tabTemplate = document.createElement('template')
tabTemplate.innerHTML = `
<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; width: 100%">
    <div></div>
    <moko-tab-bar></moko-tab-bar>
</div>
`

export class TabNavigator extends NavigatorElement {
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

  connectedCallback() {
    super.connectedCallback()

    this.style.display = 'block'
    this.style.height = 'inherit'
    this.style.width = 'inherit'
    this.style.position = 'relative'

    const defaultPath = this.getAttribute('default-path')

    const initialContent = this.getContentElement()
    if (initialContent) {
      initialContent.remove()
    }

    this.containers = {}
    this.scrollsTop = {}

    const container = tabTemplate.content.cloneNode(true)
    this.appendChild(container)

    this.$tabbar = this.querySelector('moko-tab-bar')
    this.$tabbar.activeColor = this._activeColor || '#A06CD5'

    this.routes.forEach(route => {
      const $mokoTab = document.createElement('moko-tab')
      $mokoTab.title = route.title
      $mokoTab.name = route.path

      if (route.icon) {
        $mokoTab.innerHTML = `<moko-icon name="${route.icon}"></moko-icon>`
      }
      this.$tabbar.appendChild($mokoTab)
    })

    if (location.hash) {
      this.handleEvent()
    } else {
      this.navigate(defaultPath || this.routes[0].path)
    }

    this.$tabbar.addEventListener('moko-tab-selected', event => {
      this.currentTabPath = event.detail.name
      this.navigate(event.detail.name)
    })
  }

  getContentElement() {
    return this.lastElementChild.firstElementChild || this.lastElementChild
  }

  extractChildRoutes() {
    this.routes = Array.from(this.children).filter(
      e => e.tagName === 'MOKO-TAB-ROUTE'
    )
  }

  handleEvent() {
    this.scrollsTop[this.matchedRouteLocation] =
      this.getContentElement() && this.getContentElement().scrollTop

    const {
      matchedResult,
      matchedRoute,
      routeChanged
    } = this.searchMatchingRoute()

    // Update zone content with route's associated custom element
    if (matchedResult && routeChanged) {
      if (!this.containers[matchedRoute.path]) {
        const element = document.createElement(matchedRoute.customElement)
        element.style.display = 'block'
        element.style.overflow = 'scroll'
        element.style.width = 'inherit'
        element.style.height = 'inherit'
        Object.keys(this.urlData).forEach(key => {
          element.setAttribute(key, matchedResult.urlData[key])
        })
        this.containers[matchedRoute.path] = element
      } else {
        this.syncHref(this.containers[matchedRoute.path])
      }

      this.getContentElement().replaceWith(this.containers[matchedRoute.path])

      this.getContentElement().scroll(
        0,
        this.scrollsTop[matchedRoute.path] || 0
      )

      this.$tabbar.resetActiveColorForTabs()
      this.$tabbar.selected = matchedRoute.path
    }
  }

  syncHref(element = this) {
    const $nestedNavigators = [
      ...element.querySelectorAll(
        'moko-tab-navigator, moko-switch-navigator, moko-stack-navigator'
      )
    ]
    const tabPath =
      location.href.split('#')[0] +
      '#' +
      this.getAncestorMatchedRoute() +
      (this.getAncestorMatchedRoute() ? '/' : '') +
      this.matchedRouteLocation

    $nestedNavigators.reduce((path, navigator) => {
      const nextPath = `${path}/${navigator.matchedRouteLocation}`

      if (nextPath !== location.href) {
        history.pushState({}, nextPath, nextPath)
      } else {
        history.replaceState({}, nextPath, nextPath)
      }
      return nextPath
    }, tabPath)
  }
}

customElements.define('moko-tab-navigator', TabNavigator)
