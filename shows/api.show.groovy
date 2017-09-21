import groovy.json.JsonSlurper
import groovy.text.SimpleTemplateEngine
import hot.Response

def engine = new SimpleTemplateEngine()
def template = engine.createTemplate(new String (getClass().getResourceAsStream("/__index.html").bytes,'utf-8'))
def slurper = new JsonSlurper()

rest.get('/index.html').then {
    show.blocking {
        new String(new URL("https://node-hnapi.herokuapp.com/news").bytes,'UTF-8')
    }.then { data ->
        def jsonData = slurper.parseText(data)
        def markup = '<div>'
        def i = 1
        jsonData.each {
            markup += """<hn-item index="${i++}" id="${it.id}" title="${it.title}" points="${it.points}" by="${it.user}" since="${it.time_ago}" comments-count="${it.comments_count}" url="${it.url}">
                <h4>${i}&nbsp;${it.title}</h4>
            </hn-item>"""
        }
        markup += '</div><hn-pager page="1" baseurl="#top"></hn-pager>'
        new Response(200,['Content-Type':'text/html'],template.make([markup:markup]).toString())
    }

}