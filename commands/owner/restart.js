const { token } = require('../../settings')
module.exports = {
    name: "restart", 
    description: "restart the bot", 
    cooldown: 10, 
    usage: "",
    aliases: [],
    async execute (client, message) {

        if(message.author.id !== 'your id') return;

        resetBot(client, token, message.channel)

    }
}

async function resetBot (client, token, channel) {

   await channel.send('Restarting...')
    .then(() => {
     client.destroy(true);
        setTimeout(() => { client.login(token) }, 5 * 1000) // start bot after 5 seconds
    })
    .catch(e => console.error(e))

}
