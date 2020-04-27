module.exports = client=>{
    new client.VoiceCommand("niger","Ping-Pong!",async (txt,connection,speaker)=>{//dont bully me for that command
        connection.say(speaker.username+"is niger")
    })
}