var Discord = require("discord.js")
var util = require("util")

module.exports = (client,folder)=>{
  function checkprefix(str){
    return new Promise((resolve,reject)=>{
      client.voiceprefix.forEach((pref)=>{
        //console.log(str,pref)
      if(str.startsWith(pref)){
        resolve(true)
      }
    }
    )
    resolve(false)
    })
  }
new client.Command("voicerec","Voice Recognition",folder,"owner",async (msg,args)=>{
    var connection = await msg.member.voice.channel.join();
    var receiver = connection.receiver
    await client.VoiceStuff.playFile(connection, client.folder+"/assets/wrongChannelEn.mp3")
    var rmsg = await msg.reply("Voice Recognition Active")
    //client.log("Voice Recognition Active")
    connection.on('speaking', async (user, speaking) => {
        if (!speaking  ) {
          return
        } 
        var audioStream = receiver.createStream(user, { mode: 'pcm' })
        var listener = client.VoiceStuff.listen(audioStream)
        listener.on("said",async (transcription)=>{
          if(rmsg){
            rmsg.edit("Last heard: *"+user.username+"*```"+transcription+"```")
          }
          var ispref = await checkprefix(transcription)
        if(ispref){
          var splitter = transcription.split(" ")
          splitter.splice(0,1)
          var cmd = splitter[0]
          splitter.splice(0,1)
          cnt = splitter.join(" ")
          var args = splitter
          var func = client.voicecommands.get(cmd)
          connection.say = (txt)=>{
            return client.VoiceStuff.saySmth(connection,txt)
          }
          if(func){
            func.execute(cnt,connection,user)
          }
        }
        }) 
    })
})
new client.Command("stopvoicerec","Stop Voice Recognition",folder,"owner",async (msg,args)=>{
  await msg.member.voice.channel.leave();
  await msg.reply("Disconnected and disabled voiceRecognition")
})
}