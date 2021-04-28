module.exports = {
    name: 'creators',
    description: 'shows the list of creators',
    execute(msg, args){
        msg.channel.send('My creators are: Cerel, Kapsel, SnowFox, Adeusz, Whopperflower, Happy Heavy')
        console.log('Sending bot\'s creators')
    },
}