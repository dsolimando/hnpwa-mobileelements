class PushNavigator  {

    push (state) {
        state.props = state.props || {}
        const controller = new state.viewController(state.props)
        controller.navigator = this
        const view = controller.render()
        document.body.appendChild(view)

        if (view.nodeName == '#document-fragment')
            view = document.body.lastElementChild

        setTimeout( _ => {
            view.render()
        },64)
    }
}