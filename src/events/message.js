var { RichEmbed } = require("discord.js")

module.exports = client =>{
    new client.Event("message",(data)=>{
        if(data.content.startsWith(client.prefix)){
            var cnt = data.content.substring(client.prefix.length)
            var splitter = cnt.split(" ")
            var cmd = splitter[0]
            splitter.splice(0,1)
            cnt = splitter.join(" ")
            var args = splitter
            var func = client.commands.get(cmd)
            data.replyErr = function(title,desc=""){
                data.reply(new RichEmbed({"title":"Error: "+title,"description":desc,"color":0xff0000}))
            }
            if(func){
                if(func.permlvl == "everyone"){
                    func.execute(data,args)
                }else if(func.permlvl == "owner" && data.author.id == client.ownerid){
                    func.execute(data,args)
                }else{
                    data.replyErr("Insufficient permissions!")
                }
            }else{
            data.replyErr("Command not found!",`Try \`${client.prefix}help\``)
            }
        }
    })
}