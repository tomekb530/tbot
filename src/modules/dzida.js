var EventEmitter = require("events")
var cheerio = require("cheerio")
var request = require('request')

class Dzida extends EventEmitter{
    constructor(){
        super();
        this.showed = []
        setInterval(()=>{
            request("https://jbzdy.cc",(error, response, html)=>{
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    $(".article-container").find(".article-image").each((i,el)=>{
                        var title = el.attribs.alt || ""
                        if(title){title = title.trim()}
                        var url = el.attribs.src
                        if(url && title && !this.showed.includes(url)){
                            this.showed.push(url)
                            this.emit("new-post",title,url)
                        }
                    })
                }
            })
        },60*1000)
        request("https://jbzdy.cc",(error, response, html)=>{
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    $(".article-container").find(".article-image").each((i,el)=>{
                        var title = el.attribs.alt || ""
                        if(title){title = title.trim()}
                        var url = el.attribs.src
                        if(url && title && !this.showed.includes(url)){
                            this.showed.push(url)
                            this.emit("new-post",title,url)
                            //console.log(title)
                        }
                    })
                }
            })
    }
}
module.exports = Dzida