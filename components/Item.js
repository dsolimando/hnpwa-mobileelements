import { customElement } from '../node_modules/@solidx/moko/components/common/builder.js'

const detailsTemplate = (points = '', by = '', since = '', nbCom = '') =>
  `${points !== 'null' ? points + ' points' : ''}  ${
    by !== 'null' ? 'by ' + by : ''
  } ${since} | ${nbCom} comments`

const titleLinkTemplate = (url, id, title) =>
  url.startsWith('item?')
    ? `<moko-link to="comments/${id}"><h4>${title}</h4></moko-link>`
    : `<a href="${url}" target="_blank"><h4>${title}</h4></a>`

const template = (
  id = '',
  index = '',
  title = '',
  points = '',
  by = '',
  since = '',
  url = '',
  nbCom = ''
) => `${index ? `<span>${index}</span>` : ''}
<div class="details">
    ${titleLinkTemplate(url, id, title)}
    <moko-link to="comments/${id}">
      <p>${detailsTemplate(points, by, since, nbCom)}</p>
  </moko-link>
</div>
`

const Item = customElement(
  ce =>
    template(
      ce.id,
      ce.index,
      ce.title,
      ce.points,
      ce.by,
      ce.since,
      ce.url,
      ce.commentsCount
    ),
  ['index', 'id', 'title', 'points', 'by', 'since', 'url', 'commentsCount']
)

customElements.define('hn-item', Item)
