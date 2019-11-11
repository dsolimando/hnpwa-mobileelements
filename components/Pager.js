import { customElement } from 'https://cdn.jsdelivr.net/npm/@solidx/moko@2.0.6/components/common/builder.min.js'

const template = page => `
<ul>
    <moko-link style="visibility: ${
      page === 1 ? 'hidden' : 'visible'
    }" to="page/${page - 1}">
        <li  id="back"><moko-icon name="chevron-left"></moko-icon></li>
    </moko-link>
    <li id="current-page-link">${page}</li>
    <moko-link to="page/${page +
      1}"><li id="next"><moko-icon name="chevron-right"></li></moko-link>
</ul>`

const Pager = customElement(ce => template(parseInt(ce.page)), ['page'])

customElements.define('hn-pager', Pager)
