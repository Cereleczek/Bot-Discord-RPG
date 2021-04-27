module.exports = {
    name: 'rules',
    description: 'send rules',
    execute(msg, args){
        try{
            msg.author.send("**You know the rules!** \nhttps://youtu.be/dQw4w9WgXcQ");
          }
          catch{
            msg.reply('Włącz wiadomości prywatne!');
          }
        
        
    },
}