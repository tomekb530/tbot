module.exports = client=>{
    new client.VoiceCommand("ping","Ping-Pong!","everyone",async (msg,args)=>{
        msg.reply("Pong!")
    })
}