var Discord = require("discord.js")
var util = require("util")
var googleSpeech = require('@google-cloud/speech')
var textToSpeech = require('@google-cloud/text-to-speech');
var googleSpeechClient = new googleSpeech.SpeechClient()
var textToSpeechClient = new textToSpeech.TextToSpeechClient();
var streamifier = require('streamifier');

//https://refruity.xyz/writing-discord-bot/ -- BIG THANKS :D

async function saySmth(connection,text){
  var request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'pl-PL'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };
  const [response] = await textToSpeechClient.synthesizeSpeech(request);
  return new Promise((resolve, reject) => {
    const dispatcher = connection.play(streamifier.createReadStream(response.audioContent))
    dispatcher.setVolume(1)
    dispatcher.on('start', () => {
    })
    dispatcher.on('finish', () => {
      resolve()
    })
    dispatcher.on('error', (error) => {
      console.error(error)
      reject(error)
    })
  })
}
async function playFile(connection, filePath) {
    return new Promise((resolve, reject) => {
      const dispatcher = connection.play(filePath)
      dispatcher.setVolume(0.1)
      dispatcher.on('start', () => {
        //console.log('Playing')
      })
      dispatcher.on('finish', () => {
        resolve()
      })
      dispatcher.on('error', (error) => {
        console.error(error)
        reject(error)
      })
    })
  }

const { Transform } = require('stream')

function convertBufferTo1Channel(buffer) {
  const convertedBuffer = Buffer.alloc(buffer.length / 2)

  for (let i = 0; i < convertedBuffer.length / 2; i++) {
    const uint16 = buffer.readUInt16LE(i * 4)
    convertedBuffer.writeUInt16LE(uint16, i * 2)
  }

  return convertedBuffer
}

class ConvertTo1ChannelStream extends Transform {
  constructor(source, options) {
    super(options)
  }

  _transform(data, encoding, next) {
    next(null, convertBufferTo1Channel(data))
  }
}

module.exports = client =>{
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
new client.Command("voicerec","Voice Recognition (POF should work)","owner",async (msg,args)=>{
    var connection = await msg.member.voice.channel.join();
    var receiver = connection.receiver
    await playFile(connection, client.folder+"/assets/wrongChannelEn.mp3")
    var rmsg = await msg.reply("Voice Recognition Active")
    client.log("Voice Recognition Active")
    connection.on('speaking', (user, speaking) => {
        if (!speaking  ) {
          return
        } 
        var audioStream = receiver.createStream(user, { mode: 'pcm' })
        var requestConfig = {
          encoding: 'LINEAR16',
          sampleRateHertz: 48000,
          languageCode: 'pl-PL',
          alternativeLanguageCodes: [`en-US`, `pl-PL`]
        }
        var request = {
          config: requestConfig
        }
        var recognizeStream = googleSpeechClient
          .streamingRecognize(request)
          .on('error', console.error)
          .on('data',async response => {
           var transcription = response.results
              .map(result => result.alternatives[0].transcript)
              .join('\n')
              .toLowerCase()
              //console.log(user.username,transcription)
              rmsg.edit("Last heard: *"+user.username+"*```"+transcription+"```")
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
                return saySmth(connection,txt)
              }
              if(func){
                func.execute(cnt,connection,user)
              }
            }
          })
    
        var convertTo1ChannelStream = new ConvertTo1ChannelStream()
    
        audioStream.pipe(convertTo1ChannelStream).pipe(recognizeStream)
    
        audioStream.on('end', async () => {
          
        })
      })
})
}