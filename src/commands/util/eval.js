var Discord = require("discord.js")
var util = require("util")

module.exports = client =>{
new client.Command("eval","Evaluates JS code","owner",async (msg,args)=>{
    var data = args.join(" ")
    try{
        var ret = await eval(data)
        msg.channel.send("",new Discord.RichEmbed({"title":"Return:","description":"```"+Discord.escapeMarkdown(util.inspect(ret).substring(0,2000),true)+"```","color":0x00ff00}))
    }catch(err){
        msg.channel.send("",new Discord.RichEmbed({"title":"Error: "+err.name,"description":err.message,"color":0xff0000}))
    }
})
}