import groovy.json.JsonSlurper
import groovy.text.SimpleTemplateEngine
import hot.Response

def engine = new SimpleTemplateEngine()
def template = engine.createTemplate(new String (getClass().getResourceAsStream("/__index.html").bytes,'utf-8'))
def slurper = new JsonSlurper()

rest.get('/index.html').then {
    show.blocking {
        new URL("https://node-hnapi.herokuapp.com/news").text
    }.then { data ->
        def jsonData = slurper.parseText(data)
        def markup = '<hn-pager page="1" baseurl="#top"></hn-pager><div>'
        def i = 1
        jsonData.each {
            markup += """<hn-item index="${i++}" id="${it.id}" title="${it.title}" points="${it.points}" by="${it.user}" since="${it.time_ago}" comments-count="${it.comments_count}"></hn-item>"""
        }
        markup += '</div>'
        new Response(200,['Content-Type':'text/html'],template.make([markup:markup]).toString())
    }

}