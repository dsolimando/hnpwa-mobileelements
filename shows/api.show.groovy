import groovy.json.JsonSlurper
import groovy.text.SimpleTemplateEngine
import hot.Response

def engine = new SimpleTemplateEngine()
def template = engine.createTemplate(new String (getClass().getResourceAsStream("/__index.html").bytes,'utf-8'))

rest.get('/index.html').then {
    show.blocking {
        new URL("https://node-hnapi.herokuapp.com/news").text
    }.then { data ->
        println data
        def scriptData = "<script>var initData=${data}</script>"
        new Response(200,['Content-Type':'text/html'],template.make([scriptData:scriptData]).toString())
    }

}