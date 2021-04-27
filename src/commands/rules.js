module.exports = {
    name: 'rules',
    description: 'send list of commands',
    execute(msg, args){
        try{
            msg.author.send("**You know the rules!** \nhttps://youtu.be/dQw4w9WgXcQ");
          }
          catch{
            msg.reply('Włącz wiadomości prywatne!');
          }
        
        
    },
}