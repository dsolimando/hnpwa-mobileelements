import groovy.text.SimpleTemplateEngine

def engine = new SimpleTemplateEngine()
def template = engine.createTemplate(new String (getClass().getResourceAsStream("/__index.html").bytes,'utf-8'))

rest.get('/index.html').then {
    show.http ([
        url:'https://node-hnapi.herokuapp.com/show'
    ]).then { body, status, resp ->
        def hnItems = ''
        int i = 1
        body.each {
            hnItems += """<hn-item index="${i++}" 
                id="${it.id}" 
                title="${it.title}" 
                points="${it.points}" 
                by="${it.user}" 
                since="${it.time_ago}" 
                comments-count="${it.comments_count}"></hn-item>
            """
        }
        template.make([items:hnItems]).toString()
    }
}