module.exports = {
    name: "ban", 
    description: "ban a member", 
    cooldown: 2, 
    guildOnly: true,
    usage: "<member> [reason]",
    aliases: [],
    async execute (client, message, args) {

        if(!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('sorry, you do not have permission for that!')
        }

        const member = message.guild.members.cache.get(args[0].replace(/[<!@>]/g, '')), // filters the first argument by removing <@>
        reason = args.slice(1).join(' ') || 'no reason specified';
        if(!member) return message.reply("i couldn't find this member!");
        if(!member.bannable) return message.reply("i can't ban this member!");

        message.guild.members.ban(member, { reason: reason, days: 7 })
       .then((member) => {
           message.channel.send(`Sucessfully banned ${member}!`)
       })
       .catch((e) => {
           console.error(e);
           message.reply('sorry there was an error banning that member.')
       })
    
    }
}
