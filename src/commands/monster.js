const mysql = require('mysql');
const configjson = require('C:/Bot-Discord-RPG/Bot-Discord-RPG/config.json');
module.exports = {
    name: 'm',
    description: 'send random monster',
    execute(msg, args){
        let sqlcon = mysql.createConnection(configjson.mysql);


        function between(min, max) {  
            return Math.floor(
              Math.random() * (max - min) + min
            )
          }
          
          let random = between(1, 12);
          console.log(random);

          
          sqlcon.connect(err => {
  
              if (err) return console.log('Can\'t connect to database');
          
              console.log('MySQL has been connected!');
          
              
  
              sqlcon.query(`SELECT * FROM monsters WHERE monster_id = '${random}'`, (err, result) => {
              
                let data = result.map(v => { 
                  msg.channel.send(`\`\`\` Wylosowano: ${v.monster_name}, posiada on ${v.monster_hp}hp i zadaje ${v.monster_dmg} damage!\`\`\``)
          
                });
              });
        
            });
        }
    }
