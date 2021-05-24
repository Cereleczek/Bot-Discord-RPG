const Discord = require('discord.js');

module.exports = {
    name: 'shop',
    description: 'show shop',
    async execute(msg, args){

        const one ="1️⃣";
        const two ="2️⃣";
        const three ="3️⃣";


        const shopEmbed = new Discord
        .RichEmbed()
        .setColor(0xe0b336)
        .setTitle(`======SHOP======`)
        .setDescription(`1️⃣ Blue Rose Sword - 250 G \n
2️⃣ Stick - 30 G \n
3️⃣ Plain Book - 80 G`)
        let mesg = await msg.channel.send(shopEmbed);
        await mesg.react(one)
        await mesg.react(two)
        await mesg.react(three)
        const reactions = await mesg.awaitReactions((reaction, user) => user.id === msg.author.id && (reaction.emoji.name === one || reaction.emoji.name === two || reaction.emoji.name === three), {time: 5000})
    },
}