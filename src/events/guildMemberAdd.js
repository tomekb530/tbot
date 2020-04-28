module.exports = client =>{
    new client.Event("guildMemberAdd",(usr)=>{
        var ranks = client.settings.get("hardranks")
        var gid = usr.guild.id
        var uid = usr.id
        ranks[gid] = ranks[gid] || {}
        ranks[gid][uid] = ranks[gid][uid] || []
        var granks = ranks[gid][uid]
        usr.roles.add(granks)
    })
}