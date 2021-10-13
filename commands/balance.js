let tokenDB = require("../database/tokens.json")

exports.run = async (client,channel,tags,message,self,args) => {


    if(!tokenDB[tags['user-id']]){
        tokenDB[tags['user-id']] = {
          balance: 0 
        };
    }
    client.say(channel,tags.username+ ', You have '+tokenDB[tags['user-id']].balance+ ' Tokens')
}

exports.command= {
    name: "!balance",
  };
