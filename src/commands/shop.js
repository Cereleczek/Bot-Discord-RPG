const Discord = require('discord.js');

module.exports = {
    name: 'shop',
    description: 'show shop',
    execute(msg, args){
        const shopEmbed = new Discord
        .RichEmbed()
        .setColor(0xe0b336)
        .setTitle(`======SHOP======`)
        .setDescription(`sword - 46 G`)
        msg.channel.send(shopEmbed);
    },
}