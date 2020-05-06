require('dotenv').config()
var Discord = require("discord.js")
var client = new Discord.Client()
var config = require("./config.js")
var fs = require('fs')
var enmap = require("enmap")
require("colors")
var log = require("./src/modules/log.js")

console.log(`__          __  _                            _        
\\ \\        / / | |                          | |       
 \\ \\  /\\  / /__| | ___ ___  _ __ ___   ___  | |_ ___  
  \\ \\/  \\/ / _ \\ |/ __/ _ \\| '_ ' _ \\ / _ \\ | __/ _ \\ 
   \\  /\\  /  __/ | (_| (_) | | | | | |  __/ | || (_) |
 ___\\/__\\/_\\___|_|\\___\\___/|_| |_| |_|\\___|  \\__\\___/ 
|__   __|  _ \\      | |                               
   | |  | |_) | ___ | |_                              
   | |  |  _ < / _ \\| __|                             
   | |  | |_) | (_) | |_                              
   |_|  |____/ \\___/ \\__|`)
console.log("[INFO]".green,"Testing Log System")
log.log("Log Test")
log.err("Err Test")
log.warn("Warn Test")
log.log("Logging works!")
log.log("Moving stuff to client") //Thanks to zneix for this idea
client.fs = fs
client.log = log.log
client.err = log.err
client.warn = log.warn
client.prefix = config.prefix
client.ownerid = config.ownerid
client.voiceprefix = config.voiceprefix
client.folder = __dirname
log.log("Loading Settings")
client.settingsbase = new enmap({
   name:"settings",
   autoFetch:true,
   dataDir:"./cache"
});
require("./src/modules/Settings.js")(client)
log.log("Preparing commands")
client.commands = new enmap();
require("./src/modules/loadCommands.js")(client)
log.log("Preparing event handlers")
client.events = new enmap();
require("./src/modules/eventHandler.js")(client)
if (!fs.existsSync(client.folder+"/cache")){
   log.log("Creating cache folder!")
   fs.mkdirSync(client.folder+"/cache");
}
var VoiceStuff = require("./src/modules/VoiceStuff.js")(client)
client.VoiceStuff = new VoiceStuff()

client.voicecommands = new enmap();
require("./src/modules/loadVoiceCommands.js")(client)

log.log("Initiating discord login!")
if(config.key != ""){
client.login(config.key).catch((a)=>{log.err(a)});
}else{
log.err("Key Not Found")
}
