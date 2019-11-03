import { customElement } from '../node_modules/@solidx/moko/components/common/builder.js'

const pageSize = 30

const apiUrl = 'https://node-hnapi.herokuapp.com'

async function getFeed(type, page) {
  const response = await fetch(`${apiUrl}/${type}?page=${page}`)
  return await response.json()
}

const hnItemTemplate = (result, page, i) => `<hn-item
    index="${(page - 1) * pageSize + i}"
    id="${result.id}"
    title="${result.title}"
    points="${result.points}"
    url="${result.url}"
    by="${result.user}"
    since="${result.time_ago}"
    commentsCount="${result.comments_count}"
></hn-item>`

const template = (results = [], page = 0) => `
<div class="item-list">${results
  .map((result, i) => hnItemTemplate(result, page, i))
  .join('')}</div>
`

const NewsList = customElement(
  async ce => {
    const results = await getFeed('newest', ce.page)
    return template(results, ce.page)
  },
  ['page']
)
customElements.define('hn-news-list', NewsList)

const TopList = customElement(
  async ce => {
    const results = await getFeed('news', ce.page)
    return template(results, ce.page)
  },
  ['page']
)
customElements.define('hn-top-list', TopList)

const ShowList = customElement(
  async ce => {
    const results = await getFeed('show', ce.page)
    return template(results, ce.page)
  },
  ['page']
)
customElements.define('hn-show-list', ShowList)

const AskList = customElement(
  async ce => {
    const results = await getFeed('ask', ce.page)
    return template(results, ce.page)
  },
  ['page']
)
customElements.define('hn-ask-list', AskList)

const JobList = customElement(
  async ce => {
    const results = await getFeed('jobs', ce.page)
    return template(results, ce.page)
  },
  ['page']
)
customElements.define('hn-job-list', JobList)
