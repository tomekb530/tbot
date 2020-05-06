var Dzidalib = require("../../modules/dzida.js")
var Jejalib = require("../../modules/jeja.js")
var Obrazkowolib = require("../../modules/obrazkowo.js")

var Dzida = new Dzidalib()
var Jeja = new Jejalib()
var Obrazkowo = new Obrazkowolib()
var rgbToHex = function (rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
            hex = "0" + hex;
    }
    return hex;
};

var fullColorHex = function(r,g,b) {   
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red+green+blue;
};


module.exports = (client,folder)=>{

    var postmeme = (title,url)=>{
        var chans = client.settings.get("memechans")
        console.log(title,url)
        var embed = {
            "color": fullColorHex(Math.random()*255,Math.random()*255,Math.random()*255),
            "timestamp": new Date(),
            "image": {
              "url": url
            },
            "author": {
              "name": title
            }
          }
        for(chan in chans){
            if(chans[chan]){
                var guild = client.guilds.resolve(chan)
               if(guild){
                guild.channels.resolve(chans[chan]).send({embed:embed})
               }
            }
        }
    }
    Dzida.on("new-post",(title,url)=>{postmeme("[DZIDA] "+title,url)})
    Jeja.on("new-post",(title,url)=>{postmeme("[JEJA] "+title,url)})
    Obrazkowo.on("new-post",(title,url)=>{postmeme("[OBRAZKOWO] "+title,url)})

    if(!client.settings.get("memechans")){
        client.settings.set("memechans",{})
    }

    new client.Command("memechan","Push some sick memes to this channel",folder,"fagmin",async (msg,args)=>{
        var chans = client.settings.get("memechans")
        chans[msg.guild.id]=msg.channel.id
        client.settings.set("memechans",chans)
        msg.reply("Added successfully!")
    })
}