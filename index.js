if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node v8 installed is required! Update your system."); // link for update your node: https://nodejs.org/en/

const { Client, Collection, version } = require('discord.js'), // npm i discord.js 
{ token } = require('./settings.js');

if(parseInt(version) < 12) throw new Error("You need Discord to be version 12.");

const client = new Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']}, {
    ws: {
    intents: ['MESSAGE_CREATE'] // more information about intents: https://discord.com/developers/docs/topics/gateway#gateway-intents
  }
});

client.commands = new Collection();
client.events = new Collection();

["commands","events"].forEach(handler => {
    require(`./handlers/${handler}.js`)(client);
  });

client.login(token);
