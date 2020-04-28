var seedrand = require("seedrandom")

module.exports = (client,folder)=>{
    new client.Command("howmuch","Calculates how much someone is (gay?)",folder,"everyone",async (msg,args)=>{
        args[0] = args[0] || "gay"
        if(args[1]){
            var user = args[0].replace(/[\\<>@#&!]/g, "");
            if(msg.guild.members.resolve(user)){
                var rng = seedrand(msg.guild.members.resolve(user).user.username+args[1])
                var much = Math.floor(rng()*100)
                msg.reply(msg.guild.members.resolve(user).displayName+" is "+ much +"% "+args[1])
            }else{
                msg.replyErr("Can't find user!")
            }
        }else{
            var rng = seedrand(msg.author.username+args[0])
            var much = Math.floor(rng()*100)
            msg.reply(msg.member.displayName+" is "+ much +"% "+args[0])
        }
    })
}