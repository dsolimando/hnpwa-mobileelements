const navTemplate = document.currentScript.ownerDocument.querySelector('#navigation-bar-template')

class NavigationBar extends HTMLElement {

    constructor() {
        super()
        const shadowRoot = this.attachShadow({mode:'open'})
        shadowRoot.appendChild(navTemplate.content.cloneNode(true))

        this.$title = shadowRoot.querySelector('.center-zone > span')
        this.$title.innerText = this.getAttribute('title') || 'Title'

        this.$backTitle = shadowRoot.querySelector('.back-zone > span')
        this.$backTitle.innerText = this.getAttribute('back-title') || ''

        this.backZone = shadowRoot.querySelector('.back-zone')
        
        if (this.backZone && this.navigator && this.navigator.pop) {
            this.backZone.onclick = event => {
                this.navigator.pop()
            }
        }
        
        if (this.getAttribute('anim-back-title')) {
            this.$backTitle.style.transform = 'translateX(50px)'
        }
    }

    get leftSlotAssignedNode () {
        return this.shadowRoot.querySelectorAll('slot')[0].assignedNodes()[0]
    }

    get rightSlotAssignedNode () {
        const slots = this.shadowRoot.querySelectorAll('slot')[1].assignedNodes()[0]
    }

    render () {
        setTimeout( _ => {
            this.$title.style.opacity = 1
            this.$backTitle.style.opacity = 1

            if (this.getAttribute('anim-back-title')) {
                this.$backTitle.style.transform = 'translateX(0)'
            }
        })
    }
}

customElements.define('scell-navigation-bar',NavigationBar)