module.exports = client =>{
    new client.Command("help","Just help lol","everyone",async (msg,args)=>{
        msg.reply("It will work, some day xD")
    })
}