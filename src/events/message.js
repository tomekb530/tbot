var inject = require("../modules/customFuncs.js")
module.exports = client =>{
    new client.Event("message",(data)=>{
        if(data.content.startsWith(client.prefix)){
            data.channel.startTyping()
            var cnt = data.content.substring(client.prefix.length)
            var splitter = cnt.split(" ")
            var cmd = splitter[0]
            splitter.splice(0,1)
            cnt = splitter.join(" ")
            var args = splitter
            var func = client.commands.get(cmd)
            inject(client,data)
            if(func){
                if(func.permlvl == "everyone"){
                    func.execute(data,args)
                }else if(func.permlvl == "owner" && data.author.id == client.ownerid){
                    func.execute(data,args)
                }else if(func.permlvl == "fagmin" && data.member.hasPermission("BAN_MEMBERS") ){
                    func.execute(data,args)
                }else{
                    data.replyErr("Insufficient permissions!")
                }
            }else{
            data.replyErr("Command not found!",`Try \`${client.prefix}help\``)
            }
            data.channel.stopTyping()
        }
    })
}