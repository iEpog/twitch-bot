let fs = require('fs')
exports.run = async (client,channel,tags,message,self,args) => {
    let commands = require("../database/commands.json")

    let isMod = tags.mod || tags['user-type'] === 'mod';
    let isBroadcaster = channel.slice(1) === tags.username;
    let isModUp = isMod || isBroadcaster;
    if(!isModUp) return client.say(channel,'@'+tags.username+', You are not a Moderator!')
    if(!args[0]) return client.say(channel, '@'+tags.username+', Specify command name! Example: "!deletecommand !ig')
    if(!commands[channel+'|'+args[0]]) return client.say(channel,' Cannot find a command named '+args[0])
    delete commands[channel+'|'+args[0]]
       fs.writeFile("./database/commands.json", JSON.stringify(commands), (err) => {
           if(err) return client.say(channel, ' Cannot delete command! '+err)
           client.say(channel,' Command Deleted! Name: "'+args[0])
        })

}

exports.command= {
    name: "!deletecommand",
  };
