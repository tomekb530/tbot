module.exports = client => {
    client.Event = require("./Event.js")(client)
    function loadFolder(folder){
        client.fs.readdirSync(folder).forEach((data)=>{
        if(client.fs.lstatSync(folder+"/"+data).isFile()){
            require("../../"+folder+"/"+data)(client)
            var name = data.split(".")[0]
            client.on(name,function(){client.events.get(name).execute(...arguments)})
            client.log("Loaded Event",data)
          }
        })
    }
    return loadFolder("./src/events");
}