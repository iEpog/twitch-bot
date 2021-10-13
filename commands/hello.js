exports.run = (client,channel,tags,message,self) => {
    client.say(channel, `@${tags.username}, Hey! 👋👋`);
    

}

exports.command= {
    name: "hello",
  };
