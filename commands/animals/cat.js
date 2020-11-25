const { get } = require('axios'),
{ MessageEmbed } = require('discord.js');

module.exports = {
    name: "cat",
    description: "sends the image of a cat",
    cooldown: 4,
    usage: "",
    aliases: ['meow'],
    async execute (client, message) {
        let image, response;

        try {
            response = await get("https://some-random-api.ml/img/cat");
            image = response.data;
        } catch(e){
            console.error(e);
            return message.channel.send('Han a error ocurred!')
        }

        await message.channel.send({content: "🐈 Here's a cute little cat:", embed:new MessageEmbed()
        .setImage(image.link)
        .setColor("ffdb58")
        })

    }
}
