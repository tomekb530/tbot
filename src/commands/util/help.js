module.exports = (client,folder)=>{
    new client.Command("help","Just help lol",folder,"everyone",async (msg,args)=>{
        var cmdlist = {}
        client.commands.forEach((val)=>{
            cmdlist[val.category] = cmdlist[val.category] || []
            cmdlist[val.category].push(val)
        })
        var result = ""
        for(var cat in cmdlist){
            result = result + cat.toUpperCase()+"\n"
            cmdlist[cat].forEach((a)=>{
                result = result + client.prefix + a.name + " - " + a.info +"\n"
            })
            result = result + "\n"
        }
        msg.reply(result)
    })
}