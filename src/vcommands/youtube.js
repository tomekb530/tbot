var yts = require( 'yt-search' )
var ytdl = require("ytdl-core-discord")
var wtn = require("words-to-numbers").wordsToNumbers

module.exports = client=>{
    new client.VoiceCommand("play","Youtube stuff!",async (txt,connection,speaker)=>{
        //connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { quality: 'highestaudio' }));
        var r = await yts(txt)
        var url = r.videos[0].url
        if(url){
            connection.song = connection.play(await ytdl(url), { type: 'opus' })
            connection.song.setVolume(0.5)
        }
    })

    new client.VoiceCommand("stop","Youtube stuff!",async (txt,connection,speaker)=>{
        //connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { quality: 'highestaudio' }));
        if(connection.song){
            connection.song.end()
            connection.song = undefined
        }
    })

    new client.VoiceCommand("volume","Youtube stuff!",async (txt,connection,speaker)=>{
        //connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { quality: 'highestaudio' }));
        var volume = wtn(txt)
        if(connection.song && volume < 100){
            connection.song.setVolume(volume/100)
        }
    })
}