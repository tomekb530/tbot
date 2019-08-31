var titles = [
    "six fingers", "fart of dragon", "backup plan", "hi youtube", "molten core", "old and spicy", "that guy", "angry frenchman", "local man",
	"college ball", "butt breaker", "your mom", "deadly fedora", "nothing personnel", "i studied fist", "minecon punch", "timeroller",
	"i eat steroids", "windows 10", "200% invincible", "wild ride", "i collect wood", "nanomachines, son"
]

var { RichEmbed } = require("discord.js")
var util = require("util")
var getTitle = function(){
    return titles[Math.floor(Math.random()*titles.length)]
}

var getMove = function(a,b){
    var attacks = [
        ["%s attacked %s with chair.",10],
        ["%s throwed stick at %s head.",15],
        ["%s slapped %s with hand.",5],
        ["%s attacked %s with sword.",20],
        ["%s shoots %s with rubber band.",2],
        ["%s stabbed %s with fork.",1],
        ["%s farted right in the face of %s",0],
    ]
    
    var attack = attacks[Math.floor(Math.random()*attacks.length)]
    attack[0] = util.format(attack[0],a,b)+`(-${attack[1]} HP)`
    return attack
}

module.exports = client=>{
    new client.Command("fight","Fight with another user!","everyone",async (msg,args)=>{
	var mentions = msg.mentions.users.first(2)
        var fighter1
        var fighter2
	if(mentions.length==2){
		fighter1=mentions[0]
		fighter2=mentions[1]
	}else if(msg.mentions.users.first()){
		fighter1=msg.author
		fighter2=msg.mentions.users.first()
	}else{
        fighter1=msg.author
        fighter2=client.user
    }
        var hp1 = 100
        var hp2 = 100
        if(fighter1 && fighter2){
            var turn = true
            var history = "LETS FIGHT!"
            var embed = new RichEmbed({
            "title": "**EPIC FIGHT**",
            "color": 8489110,
            "footer": {
              "text": util.format("%s vs %s",fighter1.username,fighter2.username)
            },
            "fields": [
                {
                  "name": fighter1.username+` (${hp1})`,
                  "value": "Known as: `"+getTitle()+"`",
                  "inline": true
                },
                {
                  "name":  fighter2.username+` (${hp2})`,
                  "value": "Known as: `"+getTitle()+"`",
                  "inline": true
                },
                {
                  "name": "Fight Log",
                  "value": "```xl\n"+history+"```"
                }
              ]
            })
            var fight = await msg.channel.send(embed)
            var interval = setInterval(()=>{
                if(turn){
                    turn = false
                    var move = getMove(fighter1.username,fighter2.username)
                    hp2=hp2-move[1]
                    history = move[0]
                    embed.fields[0].name = fighter1.username+` (${hp1})`
                    embed.fields[1].name = fighter2.username+` (${hp2})`
                    embed.fields[2].value = "```xl\n"+history+"```"
                    fight.edit(embed)
                }else{
                    turn = true
                    var move = getMove(fighter2.username,fighter1.username)
                    hp1=hp1-move[1]
                    history =  move[0]
                    embed.fields[0].name = fighter1.username+` (${hp1})`
                    embed.fields[1].name = fighter2.username+` (${hp2})`
                    embed.fields[2].value = "```xl\n"+history+"```"
                    fight.edit(embed)
                }
                if(hp1 <= 0){
                    history = fighter2.username+" WINS"
                    embed.fields[2].value = "```xl\n"+history+"```"
                    fight.edit(embed)
                    clearInterval(interval)
                }else if(hp2 <= 0){
                    history = fighter1.username+" WINS"
                    embed.fields[2].value = "```xl\n"+history+"```"
                    fight.edit(embed)
                    clearInterval(interval)
                }
            },2000)
        }else{
            msg.replyErr("You didn't specified your opponent!")
        }
    })
}
