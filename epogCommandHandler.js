let cmds = {};
let fs = require('fs')
const has = (command)=>{
if(cmds[command]) return cmds[command]
return false

}

module.exports.commands= {
    has: has,
    all: cmds,
}
exports.initCommands = (path) => {
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            if (!file.endsWith(".js")) return
            let cName = file.split(".")[0]
            let props = require(path + file)

            if (!props.command) return console.log(cName + ', file cannot be read! Check command template')
            let name = props.command.name
            cmds[name] = { run: props.run }
            

        })
    })

}