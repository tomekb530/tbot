var Obcy = require("../../modules/6obcyConn.js");
var Discord = require("discord.js");

module.exports = (client,folder)=>{
    new client.Command("6obcy","Connects to 6obcy chat and sends messages there",folder,"everyone",async (msg,args)=>{
        var obcy = new Obcy();
        obcy.waitingForCaptcha = false;
        obcy.init();
        function listener(data){
            if(obcy.waitingForCaptcha){
                obcy.sendCaptcha(data.content);
                obcy.waitingForCaptcha = false;
            }else if(data.content.startsWith("6o!")){
                if(data.content == "6o!stop"){
                    msg.removeChannelListener(listener);
                    msg.reply("Disconnected from 6obcy chat!");
                    obcy.fullDisconnect();
                }else if(data.content == "6o!search"){
                    msg.reply("Searching for new obcy...")
                    obcy.searchPerson();
                }else if(data.content == "6o!disconnect"){
                    obcy.disconnect();
                }else if(data.content == "6o!reconnect"){
                    obcy.reconnect();
                }
            }else{
                obcy.sendMessage(data.content);
            }
        };
        obcy.on("connected",()=>{
            msg.reply("Connected to 6obcy chat!");
            obcy.searchPerson();
            obcy.waitingForCaptcha = true;
            msg.registerChannelListener(listener);
        });
        obcy.on("caprecvsas",data=>{
            msg.replyBase64("6obcy chat","Captcha",data.tlce.data);
        });
        obcy.on("capissol",data=>{
            if(data.success){
                msg.reply("Captcha solved!");
                obcy.waitingForCaptcha = false;
            }else{
                msg.replyErr("Captcha solving failed!");
                obcy.waitingForCaptcha = true;
            }
        });
        obcy.on("rmsg",(data)=>{
            msg.reply("Obcy: "+data.msg);
        });
        obcy.on("sdis",()=>{
            msg.replyErr("Obcy disconnected!");
        });
        obcy.on("talk_s",(data)=>{
            msg.reply("Found new obcy!");
        });
    });
}