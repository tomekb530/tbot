module.exports = client=>{
new client.Command("ping","Ping-Pong!","everyone",async (msg,args)=>{
    msg.reply("Pong!")
})
}