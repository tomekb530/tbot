var puppeteer = require("puppeteer")
let clever
async function prepare(){
var browser = await puppeteer.launch()
var [defpage] = await browser.pages()
await defpage.goto("https://www.cleverbot.com",{waitUntil:"domcontentloaded"})
async function loaddefpage(){
  await defpage.evaluate(() => {
    window.addEventListener('DOMContentLoaded', (event) => {
      var targetNode = $("#line1")[0];
      var observer = new MutationObserver(function(){
        if(targetNode.style.display != 'none' && targetNode.childNodes[1]){
              var ok = targetNode.childNodes[0]
              if(ok && ok.innerHTML != "&nbsp;"){
              console.log("[CLEVERRES]"+ok.innerHTML)
              }
          }
      });
      observer.observe(targetNode, { attributes: true, childList: true });
      window.loadedcustomcode = true
  })
})
}
defpage.on("framenavigated",loaddefpage)
clever = defpage
console.log("Loaded clever api")
}

prepare()
var waiting = false

module.exports = client=>{
  new client.VoiceCommand("cleverbot","Talk with me!",async (txt,connection,speaker)=>{
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
        var listener = client.VoiceStuff.listen(audioStream)
        listener.on("said",async transcription => {
          if(!waiting){
            await clever.type(".stimulus",transcription)
            await clever.keyboard.press("Enter")
            waiting = true
          }
        })
      })
    }
  })
}