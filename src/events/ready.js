module.exports = client =>{
    new client.Event("ready",()=>{
        client.log("Logged in!")
    })
}