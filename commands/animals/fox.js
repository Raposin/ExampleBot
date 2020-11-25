const { get } = require('axios'),
{ MessageEmbed } = require('discord.js');

module.exports = {
    name: "fox",
    description: "sends the image of a fox",
    cooldown: 4,
    usage: "",
    aliases: [],
    async execute (client, message) {
        let image, response;

        try {
            response = await get("https://some-random-api.ml/img/fox");
            image = response.data;
        } catch(e){
            console.error(e);
            return message.channel.send('Han a error ocurred!')
        }

        await message.channel.send({content: "🦊 Here's a cute little fox:", embed:new MessageEmbed()
        .setImage(image.link)
        .setColor("ff8c00")
        })

    }
}
