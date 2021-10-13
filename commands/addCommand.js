let fs = require('fs')
exports.run = async (client,channel,tags,message,self,args) => {
    let commands = require("../database/commands.json")

    let isMod = tags.mod || tags['user-type'] === 'mod';
    let isBroadcaster = channel.slice(1) === tags.username;
    let isModUp = isMod || isBroadcaster;
    if(!isModUp) return client.say(channel,'@'+tags.username+', You are not a Moderator!')
    if(!args[0]) return client.say(channel, '@'+tags.username+', Specify command name! Example: "!addcommand !ig https://instagram.com/epog1337"')
    if(!args[1]) return client.say(channel, '@'+tags.username+', Specify command argument Example: "!addcommand !ig https://instagram.com/epog1337"')
    let argument = message.split(' '+args[0]+' ')[1]
    let opts ={
         response:argument,
         channel:channel,
         createdAt:Date.now(),
         createdBy:{id:tags['user-id'],username:tags.username}
        }

       commands[channel+'|'+args[0]] = opts
       fs.writeFile("./database/commands.json", JSON.stringify(commands), (err) => {
           if(err) return client.say(channel, ' Cannot add command! '+err)
           client.say(channel,'New Command! Name: "'+args[0]+ '" Response: "'+argument+'"')
        })

}

exports.command= {
    name: "!addcommand",
  };
