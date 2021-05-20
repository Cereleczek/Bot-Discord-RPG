const mysql = require('mysql');
const configjson = require('C:/Bot-Discord-RPG/Bot-Discord-RPG/config.json');
module.exports = {
    name: 'equip',
    description: 'equips an item',
    execute(msg, args){
        let sqlcon = mysql.createConnection(configjson.mysql);


          sqlcon.connect(err => {
  
              if (err) return console.log('Can\'t connect to database');
          
              console.log('MySQL has been connected!');

              sqlcon.query(`SELECT * FROM items WHERE id_item = '${args[0]}'`, (err, result) => {
                let data = result.map(v => {
                    msg.channel.send(`\`\`\`Equipped ${v.name} as ${v.type_item}\`\`\``)
                    sqlcon.query(`UPDATE characters SET ${v.type_item} = '${args[0]}' WHERE characters.id_user = ${msg.author.id};`);
              });
            });
        })
    }
}