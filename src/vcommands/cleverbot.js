var puppeteer = require("puppeteer")
let clever
async function prepare(){
var browser = await puppeteer.launch()
var [defpage] = await browser.pages()
await defpage.goto("https://www.cleverbot.com",{waitUntil:"domcontentloaded"})
await defpage.evaluate(() => {
    var targetNode = $("#line1")[0];
            var observer = new MutationObserver(function(){
               if(targetNode.style.display != 'none' && targetNode.childNodes[1]){
                    var ok = targetNode.childNodes[0]
                    if(ok){
                    console.log("[CLEVERRES]"+ok.innerHTML)
                    }
                }
            });
            observer.observe(targetNode, { attributes: true, childList: true });
})
clever = defpage
console.log("Loaded clever api")
}

prepare()
var waiting = false
var googleSpeech = require('@google-cloud/speech')
var googleSpeechClient = new googleSpeech.SpeechClient()
// NEED TO REWORK BUT IT WOULD WORK LIKE HERE
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
module.exports = client=>{
    new client.VoiceCommand("test","Talk with me!",async (txt,connection,speaker)=>{//dont bully me for that command
        if(clever){
            await clever.type(".stimulus","Cześć")
            await clever.keyboard.press('Enter');
            clever.on("console",async (msg)=>{
                if(msg._text.startsWith("[CLEVERRES]")){
                    var txt = msg._text.substring(11)
                    //console.log(txt)
                    await connection.say(txt)
                    waiting = false
                }
            })
            var receiver = connection.receiver
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
                      if(!waiting){
                    await clever.type(".stimulus",transcription)
                    await clever.keyboard.press("Enter")
                    waiting = true
                      }
                  })
            
                var convertTo1ChannelStream = new ConvertTo1ChannelStream()
            
                audioStream.pipe(convertTo1ChannelStream).pipe(recognizeStream)
            
                audioStream.on('end', async () => {
                  
                })
              })
        }
    })
}