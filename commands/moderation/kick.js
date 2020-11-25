module.exports = {
    name: "kick", 
    description: "kick a member", 
    guildOnly: true,
    cooldown: 2, 
    usage: "<member> [reason]",
    aliases: [],
    async execute (client, message, args) {

        if(!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply('sorry, you do not have permission for that!')
        }

        const member = message.guild.members.cache.get(args[0].replace(/[<@>]/g, '')), // filters the first argument by removing <@>
        reason = args.slice(1).join(' ') || 'no reason specified';
        if(!member) return message.reply("i couldn't find this member!");
        if(!member.kickable) return message.reply("i can't kick this member!");

        message.guild.members.kick(member, { reason: reason })
       .then((member) => {
           message.channel.send(`Sucessfully kicked ${member}!`)
       })
       .catch((e) => {
           console.error(e);
           message.reply('sorry there was an error kicking that member.')
       })
    
    }
}
