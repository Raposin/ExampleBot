const { inspect } = require('util');

module.exports = {
    name: "eval", 
    description: "evaluate a code", 
    cooldown: 3, 
    usage: "<code>",
    aliases: ['evaluate'],
    async execute (client, message, args) {

        try{
   
        let code = eval(args.join(' '))

        if (typeof code !== "string") inspect(code, { depth: 0 });

        if(code.length > 2000) return message.channel.send({content: 'Length of result greater than 2000:', files: [{attachment: Buffer.from(code), name: "eval.txt"}] })

        message.channel.send(`\`\`\`js\n${code}\n\`\`\``)

        } catch(e) {
            message.channel.send(`\`\`\`xl\n${e}\n\`\`\``)
        }

    }
}
