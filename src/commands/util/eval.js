var Discord = require("discord.js")
var util = require("util")

module.exports = (client,folder)=>{
new client.Command("eval","Evaluates JS code",folder,"owner",async (msg,args)=>{
    var data = args.join(" ")
    var repl
    try{
        var ret = await eval(data)
        msg.reply("Return:","xl\n"+Discord.escapeMarkdown(util.inspect(ret).substring(0,2000),true)+"")
    }catch(err){
        msg.replyErr("Error: "+err.name,err.message)
    }
})
}