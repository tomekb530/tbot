const { EventEmitter } = require("events");

class GPT extends EventEmitter{
    constructor(){
        super()
    }

    request(txt){
        console.log(txt)
    }
}