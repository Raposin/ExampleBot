module.exports = {
    name: "clear",
    description: "delete the amount of message",
    cooldown: 5,
    guildOnly: true,
    usage: "<amount>",
    aliases: ['clean', 'delete'],
    async execute (client, message, args) {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.reply('sorry, you do not have permission for that!')
        }
  const amount = parseInt(args[0]);
  if(!amount) return message.reply('provide a number!');
  if(amount > 100 || amount < 2) return message.reply('the minimum of messages is 2 and maximum 100!');

  await message.channel.bulkDelete(amount, true)
  .then((messages) => {
  message.channel.send(`Sucessfully deleted **${messages.size}** messages!`)
  })
  .catch((e) => {
  console.error(e);
  message.reply('sorry, an error occurred!')
  })

    }
}
