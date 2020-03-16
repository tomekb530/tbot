module.exports = client=>{
    new client.VoiceCommand("niger","Ping-Pong!",async (txt,connection)=>{//dont bully me for that 
        connection.say("Noger")
    })
}