var puppeteer = require("puppeteer")
var { RichEmbed,Attachment } = require("discord.js")

var addhttp = function(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}

module.exports = (client,folder)=>{
    new client.Command("screenshot","Take a screenshot of webpage!",folder,"everyone",async (msg,args)=>{
      var url = addhttp(args[0])
      var browser = await puppeteer.launch()
      var page = await browser.newPage()
      await page.setViewport({
          width:1920,
          height:1080
      })   
      await page.goto(url,{"waitUntil":"domcontentloaded"}).catch(err=>{
          msg.replyErr("Can't Load","Check if url is valid!")
          return;
      })
      var name = Date.now()
      await page.screenshot({path:client.folder+"/cache/"+name+".jpg"})
      //msg.reply("Done!",new Attachment(client.folder+"/cache/"+name+".jpg",url+".jpg"))
      var embed = new RichEmbed({"title":"Screenshot of "+url,
      "file":client.folder+"/cache/"+name+".jpg",
      "image":{"url":"attachment://"+name+".jpg"},
      "timestamp":new Date(),
      "footer":{
          "icon_url":msg.author.avatarURL,
          "text":"Screenshot"
      },
      "color":0x00ff00})
      msg.reply(embed)
      browser.close()
    })
}