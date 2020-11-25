module.exports = {
    name: "ping", 
    description: "shows the ping of the bot", 
    cooldown: 0, 
    usage: "",
    aliases: [],
    async execute (client, message) {
        const m = await message.channel.send("Pong!");
        const tLatency = m.createdTimestamp - message.createdTimestamp;
        m.edit(`Ping: ${tLatency}\nWebSocket: ${Math.round(client.ws.ping)}`);
    }
}
