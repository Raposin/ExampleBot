const { prefix } = require('../settings.js'),
{ Collection } = require('discord.js');
const cooldowns = new Collection();

module.exports = async (client, message) => {

   if(message.author.bot) return; // Ignores messages sent by bots
   if(message.guild && !message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return; // If the bot is not allowed to send messages it does not send, it avoids errors in the console

   if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){ // bot mention regex 
       return message.channel.send("Hi, i am " + client.user.username); // if they mention it the bot will return a message
   };

   if (message.content.indexOf(prefix) !== 0) return; // if the message does not start with the prefix

   const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))


if(!cmd) return message.reply('this command not exist!');

if(cmd.guildOnly && message.channel.type == 'dm') return message.channel.send('❌ This command can only be used on one server!'); // to avoid errors in commands

// an example of cooldown:

if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());
  
const timestamps = cooldowns.get(command.name),
seconds = cmd.cooldown /* how many seconds the member has to wait*/ * 1000;

if (!timestamps.has(message.author.id)) {
    timestamps.set(message.author.id, Date.now());
        setTimeout(() => timestamps.delete(message.author.id), seconds);
} else {
    if(Date.now() < timestamps.get(message.author.id) + seconds){
        const remanaing = (timestamps.get(message.author.id) + seconds - Date.now()) / 1000 // Take the remaining timestamp, decrease by the current date and divide by seconds (1000)
       return message.reply(`please await ${remanaing.toFixed(1)} second(s)!`);
    }
    timestamps.set(message.author.id, Date.now());
        setTimeout(() => timestamps.delete(message.author.id), seconds);
}

try { // tries to execute the command, if not, it returns a message and sends it to the console
    cmd.execute(client, message, args);
  } catch (e) {
    console.error(e);
    return message.reply("An error occurred while executing the command " + cmd.help.name);
  }

} 
