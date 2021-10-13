const tmi = require('tmi.js');
let config = require('./config.json')
let fetch = require('node-fetch')
const fs = require("fs");
let epog = require('./epogCommandHandler.js');
const { Webhook } = require('discord.js');


const client = new tmi.Client({
    connection: {
        reconnect: true,
        secure: true
    },
    identity: config.identify,

    channels: config.channels
});


let commands = epog.commands.all


if (config.WebhookLogging) {
    var URL = config.WebhookURL
    let WebhookSend = (message) => {
        fetch(URL, {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify({
                "content": message
            })

        })
            .then(res => res)
            .catch(err => console.error(err));
    }
    client.on("ban", (channel, username, reason, userstate) => {
        WebhookSend(channel + ': ' + username + ' Banned from this channel! Reason: ' + reason)
    });
    const tierList = { 1000: 'Tier 1', 2000: 'Tier 2', 3000: 'Tier 3' };
    client.on('resub', (channel, username, months, message, userstate, methods) => {

        let msg = `${username} just resubbed for ${months} month(s)`;
        if (methods.prime) msg += ` using Prime for ${months} month(s)`;
        else if (methods.plan !== '1000') msg += ` | ${tierList[methods.plan]} `;
        WebhookSend(`${channel}: ${msg}!`);
    });
    client.on("hosted", (channel, username, viewers, autohost) => {
        WebhookSend(channel + ': ' + username + ', hosted us with ' + viewers + ' viewers! Thanks for the host ❤️')

    })
    client.on("raided", (channel, username, viewers) => {
        WebhookSend(channel + ': ' + username + ', raided us with ' + viewers + ' viewers! Thanks for the raid ❤️')
    })


}


client.on('resub', (channel, username, months, message, userstate, methods) => {
    const tierList = { 1000: 'Tier 1', 2000: 'Tier 2', 3000: 'Tier 3' };

    let msg = `${username} just resubbed for ${months} month(s)`;
    if (methods.prime) msg += ` using Prime for ${months} month(s)`;
    else if (methods.plan !== '1000') msg += ` | ${tierList[methods.plan]} `;
    client.say(channel, `${msg}!`);
});


client.on('message', (channel, tags, message, self) => {
    if (self) return;
    const args = message.slice().trim().split(/ +/g)
    let cmd = epog.commands.has(args.shift().toLowerCase())
    if (cmd) cmd.run(client, channel, tags, message, self, args)
})

client.on("connected", (address, port) => {
    console.log('Connected')
    epog.initCommands("./commands/");
})
client.on("hosted", (channel, username, viewers, autohost) => {
    client.say(channel, username + ', hosted us with ' + viewers + ' viewers! Thanks for the host ❤️')

})
client.on("raided", (channel, username, viewers) => {
    client.say(channel, username + ', raided us with ' + viewers + ' viewers! Thanks for the raid ❤️')
})




client.connect().catch(console.error);