const { MessageEmbed } = require('discord.js'),
{ prefix } = require('../../settings');

module.exports = {
    name: "help",
    description: "shows the commands of the bot",
    usage: "[command]",
    cooldown: 0,
    aliases: ['commands'],
    async execute (client, message, args) {
    
       const embed = new MessageEmbed()

        if(!args[0]){

        client.commands.forEach((cmd)=>{
          embed.addField(`${prefix}${cmd.name} ${cmd.usage}`, cmd.description, false)
          embed.setColor("RANDOM")
        })

    } else {
     const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()))
     if(!cmd) return message.reply('this command not exist!');

    embed.setTitle(cmd.name)
    embed.setDescription(cmd.description)
    embed.addField('Usage:', `${prefix}${cmd.name} ${cmd.usage}`, true)
    embed.addField('Cooldown:', cmd.cooldown, true)
    embed.addField('Aliases:', cmd.aliases.length > 0 ? cmd.aliases.join(', ') : 'None', true)
    embed.setColor("RANDOM")
    }

    await message.author.send({content:`**${client.user.username}** commands:`, embed:embed})
    .then(() => message.react('☑️'))
    .catch(() => message.reply('⚠️ Your Direct Message is closed, open it so I can send my commands.'))

    }
}
