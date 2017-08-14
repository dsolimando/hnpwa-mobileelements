const urlRouting = {

    handleUrlRouting (routingData) {
        this.routingData = routingData

        addEventListener('hashchange', event => {

            if (!this.$container) {
                removeEventListener('hashchange',this)
            }

            Object.getOwnPropertyNames(routingData).forEach( key => {
                if (this.handleRouting) {
                    this.handleRouting(key,routingData[key])
                }
            },this)
        })
    },

    handleRouting(routePattern, controllerClass) {
        
        if (routePattern.constructor === RegExp) {

            const match = routePattern.exec(location.hash.slice(1))
            const [a, ...matchData] = match
            if (match) {
                this.push({
                    props: {
                        urlData: matchData
                    }
                })
            } 
        } else if (routePattern.constructor === String) {

            const pattern = /(:\w+)/g
            const foundVars = routePattern.match(pattern) || []
            let extractedVars = []
            if (foundVars) {
                extractedVars = foundVars.map( word => { return word.slice(1) }) 
            }

            const routeRegExp = new RegExp(routePattern.replace(pattern,'(\\w+)'))
            
            const match = location.hash.slice(1).match(routeRegExp)
            if (match) {
                const [a,...matchData] = match
                let urlData = {}
                for (var index = 0; index < foundVars.length; index++) {
                    urlData[extractedVars[index]] = matchData[index]
                }
                this.push({
                    viewController: controllerClass,
                    props: {
                        urlData: urlData
                    }
                })
            }
        } else {
            throw Error('routePattern field must be of type RegRxp or String')
        }
    }
}