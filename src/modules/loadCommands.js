module.exports = client => {
    client.Command = require("./Command.js")(client)
    function loadFolder(folder){
        client.fs.readdirSync(folder).forEach((data)=>{
          if(client.fs.lstatSync(folder+"/"+data).isDirectory()){
            loadFolder(folder+"/"+data)
          }else if(client.fs.lstatSync(folder+"/"+data).isFile()){
            require("../../"+folder+"/"+data)(client,folder)
            client.log("Loaded Command",data)
          }
        })
    }
    return loadFolder("./src/commands");
}