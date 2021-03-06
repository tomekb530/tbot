module.exports = client => {
    return class Command{
        constructor(name,info,cat,permlvl,func){
            this.name = name
            this.info = info
            this.permlvl = permlvl
            this.func = func
            this.category = cat
            client.commands.set(this.name,this)
        }
        async execute(msg,args){
            try {
                this.func(msg,args)
            }catch(err){
                msg.channel.send("",new Discord.RichEmbed({"title":"Command Error: "+err.name,"description":err.message,"color":0xff0000}))
            }
        }
    }
}