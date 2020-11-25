module.exports = {
    name: "unban", 
    description: "unban a user", 
    cooldown: 2, 
    guildOnly: true,
    usage: "<userID> [reason]",
    aliases: [],
    async execute (client, message, args) {

        if(!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('sorry, you do not have permission for that!')
        }

        const id = args[0];
        if(!id || isNaN(id)) return message.reply('privide the id!');

        try {
        await client.users.fetch(id);
        } catch(e) {
         message.reply('provide at valid user id!');
        }

        message.guild.members.unban(id, { reason: args.slice(1).join(' ') || 'no reason specified' })
        .then((member) => { message.channel.send(`Sucessfully unbanned ${member}!`)})
        .catch((e) => {
            console.error(e);
            message.reply("sorry, an error occurred.");
        })

    }
}
