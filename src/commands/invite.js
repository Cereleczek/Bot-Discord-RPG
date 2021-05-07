module.exports = {
    name: 'invite',
    description: 'send bot\'s invite',
    execute(msg, args){
        msg.channel.send('https://discord.com/api/oauth2/authorize?client_id=836323294847565824&permissions=8&scope=bot')
        console.log('Sending bot\'s invitation')
    },
}