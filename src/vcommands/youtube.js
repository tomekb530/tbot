var yts = require( 'yt-search' )
var ytdl = require("ytdl-core-discord")
var wtn = require("words-to-numbers").wordsToNumbers

module.exports = client=>{
    new client.VoiceCommand("play","Youtube stuff!",async (txt,connection,speaker)=>{
        var r = await yts(txt)
        var url = r.videos[0].url
        if(url){
            if(connection.song){
                connection.song.end()
                connection.song = undefined
            }
            connection.song = connection.play(await ytdl(url), { type: 'opus' })
            connection.song.setVolume(0.1)
        }
    })

    new client.VoiceCommand("stop","Youtube stuff!",async (txt,connection,speaker)=>{
        if(connection.song){
            connection.song.end()
            connection.song = undefined
        }
    })

    new client.VoiceCommand("volume","Youtube stuff!",async (txt,connection,speaker)=>{
        var volume = wtn(txt)
        if(connection.song && volume < 100){
            connection.song.setVolume(volume/200)
        }
    })
}