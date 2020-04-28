module.exports = (client,folder)=>{
new client.Command("ping","Ping-Pong!",folder,"everyone",async (msg,args)=>{
    msg.reply("Pong!")
})
}