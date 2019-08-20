module.exports = client => {
    return class Event{
        constructor(name,func){
            this.name = name
            this.func = func
            client.events.set(this.name,this)
        }
        execute(){
            try {
                this.func(...arguments)
            }catch(err){
                
            }
        }
    }
}