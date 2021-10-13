exports.run = async (client,channel,tags,message,self,args) => {

    let isMod = tags.mod || tags['user-type'] === 'mod';
    let isBroadcaster = channel.slice(1) === tags.username;
    let isModUp = isMod || isBroadcaster;
    if(!isModUp) return client.say(channel,'@'+tags.username+', You are not a Moderator!')
    let slowct = args[0]
    if(!slowct) slowct = 30
    if(!isNaN(args[0])) slowct = Number(args[0])
    if(isNaN(args[0])) slowct = 30

    client.slow(channel, slowct)
    client.say(channel,'Slow activated! '+slowct+' Seconds')
}

exports.command= {
    name: "!slow",
  };
