var googleSpeech = require('@google-cloud/speech');
var textToSpeech = require('@google-cloud/text-to-speech');
var googleSpeechClient = new googleSpeech.SpeechClient();
var textToSpeechClient = new textToSpeech.TextToSpeechClient();
var streamifier = require('streamifier');
var { Transform } = require('stream');
var EventEmitter = require("events");
//https://refruity.xyz/writing-discord-bot/ -- BIG THANKS :D

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
return class VoiceStuff{
    async saySmth(connection,text){
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
    async playFile(connection, filePath) {
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

    listen(audioStream){
        var emitter = new EventEmitter()
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
                emitter.emit("said",transcription);
            })

            var convertTo1ChannelStream = new ConvertTo1ChannelStream()
    
            audioStream.pipe(convertTo1ChannelStream).pipe(recognizeStream)
        return emitter
    }

}


}