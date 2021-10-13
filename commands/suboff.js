exports.run = async (client,channel,tags,message,self,args) => {

    let isMod = tags.mod || tags['user-type'] === 'mod';
    let isBroadcaster = channel.slice(1) === tags.username;
    let isModUp = isMod || isBroadcaster;
    if(!isModUp) return client.say(channel,'@'+tags.username+', You are not a Moderator!')
    client.subscribersoff(channel)
    client.say(channel,'Sub-Mode Off!')
}

exports.command= {
    name: "!submodeoff",
  };
