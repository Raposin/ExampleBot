const { readdirSync } = require('fs');

module.exports = async client => {
    const arc = await readdirSync('./commands');

    const categories = arc.filter(f => !f.endsWith('.js'))
    const misc = arc.filter(f => f.endsWith('.js'));

    categories.forEach(category => {
        const commands = readdirSync(`./commands/${category}`).filter(f => f.endsWith('.js'));
        for (const file of commands) {
          const command = require(`../commands/${category}/${file}`)
          !command.category ? command.category = category : null
          client.commands.set(command.name, command);
        }
      });

      misc.forEach(file => {
        const command = require(`../commands/${file}`)
        !command.category ? command.category = "misc" : null
        client.commands.set(command.name, command);
      })
}
