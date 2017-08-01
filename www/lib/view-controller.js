const template = document.currentScript.ownerDocument.querySelector('#view-controller-container')

class View extends HTMLElement {

    constructor() {
        super()
        const $shadowRoot = this.attachShadow({mode:'open'})
        $shadowRoot.appendChild(template.content.cloneNode(true))
        this.toopacity = getComputedStyle(this).opacity

        if (this.getAttribute("transition") == 'cover-vertical') {
            this.style.transform = 'translateY(100%)'
        } else if (this.getAttribute("transition") == 'cover-horizontal') {
            this.style.transform = 'translateX(100%)'
        } else if (this.getAttribute("transition") == 'fade-in') {
            this.style.opacity = 0;
        }
        if (this.getAttribute("transition")) {
            setTimeout( _ => {
                this.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            })
        }
    }

    render() {
        if (this.getAttribute("transition") == 'cover-vertical') {
            setTimeout( _ => {
                this.style.transform = 'translateY(0)'
            })
        } else if (this.getAttribute("transition") == 'cover-horizontal') {
            setTimeout( _ => {
                this.style.transform = 'translateX(0)'
            })
        } else if (this.getAttribute("transition") == 'fade-in') {
            setTimeout( _ => {
                this.style.opacity = 1
            })
        }
    }

    hide () {
        if (this.getAttribute('transition') == 'cover-vertical') {
            setTimeout( _ => {
                this.style.transform = 'perspective(100px) translate3D(0,0,-10px)'
                this.style.opacity = 0.5
            })
        } else if (this.getAttribute('transition') == 'cover-horizontal') {
            setTimeout( _ => {
                this.style.transform = 'translateX(100%)'
            })
        } else if (this.getAttribute("transition") == 'fade-in') {
             setTimeout( _ => {
                this.style.opacity = 0
            })
        }
    }
    
}

customElements.define('scell-view',View)