let fs = require('fs')
let tokenDB = require("../database/tokens.json")

exports.run = async (client,channel,tags,message,self,args) => {


    if(Math.random() < 0.5){
        
    
    client.say(channel, `@${tags.username}, was so unlucky and lost. | 120 Second Timeout`);
    client.timeout(channel,tags.username, 120,"ROULETTE").then().catch(err=>console.log(err))
}else{
    client.say(channel, `@${tags.username}, was very lucky and won. | 100 Token`);
    if(!tokenDB[tags['user-id']]){
        tokenDB[tags['user-id']] = {
          balance: 0 
        };
    }
    tokenDB[tags['user-id']].balance = tokenDB[tags['user-id']].balance + 100

    fs.writeFile("./database/tokens.json", JSON.stringify(tokenDB), (err) => {
    })
}
}

exports.command= {
    name: "!roulette",
  };
