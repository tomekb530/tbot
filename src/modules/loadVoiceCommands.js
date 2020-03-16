module.exports = client => {
    client.Command = require("./VoiceCommand.js")(client)
    function loadFolder(folder){
        client.fs.readdirSync(folder).forEach((data)=>{
          if(client.fs.lstatSync(folder+"/"+data).isDirectory()){
            loadFolder(folder+"/"+data)
          }else if(client.fs.lstatSync(folder+"/"+data).isFile()){
            require("../../"+folder+"/"+data)(client)
            client.log("Loaded Command",data)
          }
        })
    }
    return loadFolder("./src/vcommands");
}