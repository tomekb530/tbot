module.exports = client=>{
new client.Command("ping","Ping-Pong!","everyone",function(msg,args){
    msg.reply("Pong!")
})
}