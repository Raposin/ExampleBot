const { readdirSync } = require("fs"); 

module.exports = (client) => {
    const eventFiles = readdirSync('./events').filter(f => f.endsWith('.js'));
    for (let i = 0; i < eventFiles.length; i++) {
      const event = require(`../events/${eventFiles[i]}`);
      const name = eventFiles[i].split(".")[0];
      client.events.set(name, event);
      client.on(name, (...args) => client.events.get(name)(client, ...args));
}
}
