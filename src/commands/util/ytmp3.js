var ytdl = require('youtube-audio-stream');
var { Attachment } = require('discord.js');
var getVideoId = require('get-video-id');
var fetchVideoInfo = require('youtube-info');

module.exports = client=>{
    new client.Command("ytmp3","Youtube to mp3 lol","everyone",async (msg,args)=>{
        var url = args[0]
        var mytime = Date.now()
        msg.reply("Converting Please Wait")
        var file = client.fs.createWriteStream(client.folder+'/cache/'+mytime+".mp3")
        var yt = ytdl(url)
        yt.pipe(file)
        yt.on("error",function(er){client.err(er)})
        file.on("finish",function(){
            fetchVideoInfo(getVideoId(url).id, function (err, videoInfo) {
            var attach = new Attachment(client.folder+'/cache/'+mytime+".mp3",videoInfo.title+".mp3")
            msg.reply("Done!",attach).then((msg)=>{
                msg.attachments.forEach((a)=>{
                    msg.channel.send(a.url)
                })
            })
        })
        })
    })
}