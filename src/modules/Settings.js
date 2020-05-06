module.exports = client =>{
    client.settings = {}
    client.settings.set = function(name,val){
        client.settingsbase.set(name,val)
    }
    client.settings.get = function(name,val){
        if(!client.settingsbase.get(name)){
            client.settingsbase.set(name,{})
        }
        return client.settingsbase.get(name,val)
    }
}