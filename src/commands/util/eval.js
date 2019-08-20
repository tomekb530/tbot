var Discord = require("discord.js")
var util = require("util")

module.exports = client =>{
new client.Command("eval","Evaulates JS code","owner",function(msg,args){
    var data = args.join(" ")
    try{
        var ret = eval(data)
        msg.channel.send("",new Discord.RichEmbed({"title":"Return:","description":util.inspect(ret),"color":0x00ff00}))
    }catch(err){
        msg.channel.send("",new Discord.RichEmbed({"title":"Error: "+err.name,"description":err.message,"color":0xff0000}))
    }
})
}