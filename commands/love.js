exports.run = async (client,channel,tags,message,self,args) => {


    let pr = args[0]
    if(!pr) pr = channel.split('#')[1]
    client.say(channel, `@${tags.username} ❤️ ${Math.floor(Math.random() * 100)}% ❤️ ${pr}`);
  
 
}

exports.command= {
    name: "!love",
  };
