require("colors")
var log = {}
log.log = function(){
    console.log("[LOG]".green,...arguments)
}
log.err = function(){
    console.log("[ERROR]".red,...arguments)
}
log.warn = function(){
    console.log("[WARN]".yellow,...arguments)
}

module.exports = log