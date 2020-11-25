module.exports = {
    name: "lock", 
    description: "close the channel", 
    cooldown: 3, 
    guildOnly: true,
    usage: "[channel]",
    aliases: [],
    async execute (client, message, args) {

        if(!message.member.permissions.has('MANAGE_CHANNELS')) {
            return message.reply('sorry, you do not have permission for that!')
        }

        const channel = message.guild.channels.cache.find(c => c.name.includes(args[0].toLowerCase())) || message.guild.channels.cache.get(args[0].replace(/[<#>]/g, '')) /* to remove the <#> from the mention and just keep the id*/ || message.channel
        
        channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false })
        .then(() => { channel.setName("🔒 " + channel.name) })
        .catch((e) => {
            console.error(e);
            message.reply("sorry, an error occurred.")
        })


    }
}
