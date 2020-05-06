var EventEmitter = require("events")
var cheerio = require("cheerio")
var request = require('request')

class Obrazkowo extends EventEmitter{
    constructor(){
        super();
        this.showed = []
        setInterval(()=>{
            request("https://obrazkowo.pl/main/last",(error, response, html)=>{
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    $(".mt-2").find(".img-fluid").each((i,el)=>{
                        var title = el.attribs.alt || ""
                        if(title){title = title.trim()}
                        var url = el.attribs.src
                        if(url && title && !this.showed.includes(title)){
                            this.showed.push(title)
                            this.emit("new-post",title,url)
                        }
                    })
                }
            })
        },60*1000)
        request("https://obrazkowo.pl/main/last",(error, response, html)=>{
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    $(".mt-2").find(".img-fluid").each((i,el)=>{
                        var title = el.attribs.alt || ""
                        if(title){title = title.trim()}
                        var url = el.attribs.src
                        if(url && title && !this.showed.includes(title)){
                            this.showed.push(title)
                            this.emit("new-post",title,url)
                            //console.log(title)
                        }
                    })
                }
            })
    }
}
module.exports = Obrazkowo
