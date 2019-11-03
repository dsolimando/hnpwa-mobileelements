import { customElement } from '../node_modules/@solidx/moko/components/common/builder.js'

const NewsSwitchNavigator = customElement(
  () => `<moko-switch-navigator default-path="page/1">
<moko-route path="page/:page" component="hn-news-stack-navigator"></moko-route>
</moko-switch-navigator>`
)
customElements.define('hn-news-switch-navigator', NewsSwitchNavigator)

const NewsCommentsNavigator = customElement(
  ce => `<moko-stack-navigator modal>
    <moko-route path="items" component="hn-news-list" ></moko-route>
    <moko-route path="comments/:itemId" component="hn-comments-screen" ></moko-route>
</moko-stack-navigator>
<hn-pager page="${ce.page}"></hn-pager>`,
  ['page']
)
customElements.define('hn-news-stack-navigator', NewsCommentsNavigator)

const TopSwitchNavigator = customElement(
  () => `<moko-switch-navigator default-path="page/1">
<moko-route path="page/:page" component="hn-top-stack-navigator"></moko-route>
</moko-switch-navigator>`
)
customElements.define('hn-top-switch-navigator', TopSwitchNavigator)

const TopCommentsNavigator = customElement(
  ce => `<moko-stack-navigator modal>
    <moko-route path="items" component="hn-top-list" ></moko-route>
    <moko-route path="comments/:itemId" component="hn-comments-screen" ></moko-route>
</moko-stack-navigator>
<hn-pager page="${ce.page}"></hn-pager>`,
  ['page']
)
customElements.define('hn-top-stack-navigator', TopCommentsNavigator)

const ShowSwitchNavigator = customElement(
  () => `<moko-switch-navigator default-path="page/1">
<moko-route path="page/:page" component="hn-show-stack-navigator"></moko-route>
</moko-switch-navigator>`
)
customElements.define('hn-show-switch-navigator', ShowSwitchNavigator)

const ShowCommentsNavigator = customElement(
  ce => `<moko-stack-navigator modal>
    <moko-route path="items" component="hn-show-list" ></moko-route>
    <moko-route path="comments/:itemId" component="hn-comments-screen" ></moko-route>
</moko-stack-navigator>
<hn-pager page="${ce.page}"></hn-pager>`,
  ['page']
)
customElements.define('hn-show-stack-navigator', ShowCommentsNavigator)

const AskSwitchNavigator = customElement(
  () => `<moko-switch-navigator default-path="page/1">
<moko-route path="page/:page" component="hn-ask-stack-navigator"></moko-route>
</moko-switch-navigator>`
)
customElements.define('hn-ask-switch-navigator', AskSwitchNavigator)

const AskCommentsNavigator = customElement(
  ce => `<moko-stack-navigator modal>
    <moko-route path="items" component="hn-ask-list" ></moko-route>
    <moko-route path="comments/:itemId" component="hn-comments-screen" ></moko-route>
</moko-stack-navigator>
<hn-pager page="${ce.page}"></hn-pager>`,
  ['page']
)
customElements.define('hn-ask-stack-navigator', AskCommentsNavigator)

const JobsSwitchNavigator = customElement(
  () => `<moko-switch-navigator default-path="page/1">
<moko-route path="page/:page" component="hn-job-stack-navigator"></moko-route>
</moko-switch-navigator>`
)
customElements.define('hn-jobs-switch-navigator', JobsSwitchNavigator)

const JobsCommentsNavigator = customElement(
  ce => `<moko-stack-navigator modal>
    <moko-route path="items" component="hn-job-list" ></moko-route>
    <moko-route path="comments/:itemId" component="hn-comments-screen" ></moko-route>
</moko-stack-navigator>
<hn-pager page="${ce.page}"></hn-pager>`,
  ['page']
)
customElements.define('hn-job-stack-navigator', JobsCommentsNavigator)
