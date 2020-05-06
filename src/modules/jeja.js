var EventEmitter = require("events")
var cheerio = require("cheerio")
var request = require('request')

class Jeja extends EventEmitter{
    constructor(){
        super();
        this.showed = []
        setInterval(()=>{
            request("https://memy.jeja.pl",(error, response, html)=>{
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    $(".ob-left-box-images").find(".ob-left-image").each((i,el)=>{
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
        request("https://memy.jeja.pl",(error, response, html)=>{
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    $(".ob-left-box-images").find(".ob-left-image").each((i,el)=>{
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
module.exports = Jeja