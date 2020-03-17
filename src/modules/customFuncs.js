var { MessageEmbed } = require("discord.js")

module.exports = (client,msg) => {
    msg.replyErr = async function(title,desc=""){
        var repl = await msg.reply({embed:{"title":"Error: "+title,"description":desc,"color":0xff0000}})
        repl.react("❌")
        var collector = repl.createReactionCollector((react,user)=>{return user.id == client.ownerid && react.emoji.name == "❌"},{ time: 15000 })
        collector.on("collect",()=>{
        repl.delete()
        msg.delete()
        })
    }
}