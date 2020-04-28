module.exports = (client,folder) =>{
    new client.Command("hardrole","Add role that is persistent between rejoins to the discord!",folder,"fagmin",async (msg,args)=>{
        if(args[0] && args[1]){
            var user = args[0].replace(/[\\<>@#&!]/g, "");
            var rank = args[1].replace(/[\\<>@#&!]/g, "");
            var gid = msg.guild.id
            if(user.trim() !== "" && rank.trim() !== "" && msg.guild.roles.resolve(rank)){
                var ranks = client.settings.get("hardranks")
                ranks[gid] = ranks[gid] || {}
                ranks[gid][user] = ranks[gid][user] || []
                if(!ranks[gid][user].includes(rank)){
                    ranks[gid][user].push(rank)
                }
                client.settings.set("hardranks",ranks)
                if(msg.guild.members.resolve(user)){
                    msg.guild.members.resolve(user).roles.add(rank)
                }
                msg.reply("Successfully Added HardRole!")
            }else{
                msg.replyErr("Wrong Arguments!");
            }
        }else{
            msg.replyErr("Insufficient Arguments!");
        }
    })

    new client.Command("rmhardrole","Remove role that is persistent between rejoins to the discord!",folder,"fagmin",async (msg,args)=>{
        if(args[0] && args[1]){
            var user = args[0].replace(/[\\<>@#&!]/g, "");
            var rank = args[1].replace(/[\\<>@#&!]/g, "");
            var gid = msg.guild.id
            if(user.trim() !== "" && rank.trim() !== "" && msg.guild.roles.resolve(rank)){
                var ranks = client.settings.get("hardranks")
                ranks[gid] = ranks[gid] || {}
                ranks[gid][user] = ranks[gid][user] || []
                if(ranks[gid][user].includes(rank)){
                    ranks[gid][user] = ranks[gid][user].filter((e)=>{return e!=rank})
                }
                client.settings.set("hardranks",ranks)
                if(msg.guild.members.resolve(user)){
                    msg.guild.members.resolve(user).roles.remove(rank)
                }
                msg.reply("Successfully Removed HardRole!")
            }else{
                msg.replyErr("Wrong Arguments!");
            }
        }else{
            msg.replyErr("Insufficient Arguments!");
        }
    })
}