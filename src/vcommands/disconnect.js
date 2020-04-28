module.exports = client=>{
    new client.VoiceCommand("disconnect","Disconnect",async (txt,connection,speaker)=>{
        connection.disconnect();
    })
}