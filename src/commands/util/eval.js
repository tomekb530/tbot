var Discord = require("discord.js")
var util = require("util")

module.exports = client =>{
new client.Command("eval","Evaluates JS code","owner",async (msg,args)=>{
    var data = args.join(" ")
    var repl
    try{
        var ret = await eval(data)
        repl = await msg.channel.send("",{embed:{"title":"Return:","description":"```xl\n"+Discord.escapeMarkdown(util.inspect(ret).substring(0,2000),true)+"```","color":0x00ff00}})
    }catch(err){
        repl = await msg.channel.send("",{embed:{"title":"Error: "+err.name,"description":err.message,"color":0xff0000}})
    }
    repl.react("❌")
    var collector = repl.createReactionCollector((react,user)=>{return user.id == client.ownerid && react.emoji.name == "❌"},{ time: 15000 })
    collector.on("collect",()=>{
        repl.delete()
        msg.delete()
    })
})
}