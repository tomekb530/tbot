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
            if(func){
                if(func.permlvl == "everyone"){
                    func.execute(data,args)
                }else if(func.permlvl == "owner" && data.author.id == client.ownerid){
                    func.execute(data,args)
                }else{
                    data.reply("Insufficient permissions!")
                }
            }else{
            data.reply("Command not found!")
            }
        }
    })
}