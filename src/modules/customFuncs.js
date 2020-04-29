var { MessageEmbed } = require("discord.js")
var util = require("util")
module.exports = (client,msg) => {
    msg.replyErr = async function(title,desc){
        var embed = {
            "title":"",
            "color": 13632027,
            "description":"",
            "timestamp": new Date(),
            "footer": {
              "icon_url": client.user.avatarURL(),
              "text": msg.func.name
            },
        }
        
        if(util.isObject(title)){
            embed = title
        }else{
            if(desc){
                embed.title = title
                embed.description = "```"+desc+"```"
            }else{
                embed.title = "Error:"
                embed.description = "```"+title+"```"
            }
        }
        var repl = await msg.channel.send({embed:embed})
        repl.react("❌")
        var collector = repl.createReactionCollector((react,user)=>{return user.id == msg.author.id && react.emoji.name == "❌"},{ time: 15000 })
        collector.on("collect",()=>{
        repl.delete()
        msg.delete()
        })
        return repl
    }
    msg.reply = async function(title,desc){
        var embed = {
            "title": "",
            "color": 7929600,
            "description":"",
            "timestamp": new Date(),
            "footer": {
              "icon_url": client.user.avatarURL(),
              "text": msg.func.name
            },
        }
        if(util.isObject(title)){
            embed = title
        }else{
        if(desc){
            embed.title = title
            embed.description = "```"+desc+"```"
        }else{
            embed.title = "Info:"
            embed.description = "```"+title+"```"
        }
        }

        var repl = await msg.channel.send({embed:embed})
        repl.react("❌")
        var collector = repl.createReactionCollector((react,user)=>{return user.id == msg.author.id && react.emoji.name == "❌"},{ time: 15000 })
        collector.on("collect",()=>{
        repl.delete()
        msg.delete()
        })
        return repl
    }
}