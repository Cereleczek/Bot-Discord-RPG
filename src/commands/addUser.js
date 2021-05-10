const mysql = require("mysql");
const one ="⚔️";
const two ="🏹";
const three ="🪄";
module.exports = {
    name: "createprofil",
    desciption: "create his characters",
    cooldown: 25,

    async execute(msg, args) 

    {
        const con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "discordbot"
          })
          
          con.connect(err =>{
            if(err) throw err;
          })
      con.query(`SELECT * FROM characters WHERE id_user = ${msg.author.id}`, async (err, rows) =>{
        if(rows.length>0)
        return msg.reply('Już wybrałeś swoją klasę!');
        let mesg = await msg.reply('Wybierz swoją klasę:\nWojownik ⚔️\nŁucznik 🏹\nMag 🪄');
        await mesg.react(one)
        await mesg.react(two)
        await mesg.react(three)
        const reactions = await mesg.awaitReactions((reaction, user) => user.id === msg.author.id && (reaction.emoji.name === one || reaction.emoji.name === two || reaction.emoji.name === three), {time: 5000})
        if(reactions.has(one)&&!reactions.has(two)&&!reactions.has(three))
        {
          con.query(`INSERT INTO characters (id, id_user, class, lvl, exp, helmet, breastplate, trousers, shoes, weapon, hp, str, dex, inte, gold, place) VALUES (NULL, ${msg.author.id}, 'warrior', '1', '1', NULL, NULL, NULL, NULL, '7', '10', '10', '10', '10', '10', 'City');`);
          return msg.reply('Zostałeś: WOJOWNIKIEM');
        }
        else if(reactions.has(two)&&!reactions.has(one)&&!reactions.has(three))
        {
          con.query(`INSERT INTO characters (id, id_user, class, lvl, exp, helmet, breastplate, trousers, shoes, weapon, hp, str, dex, inte, gold, place) VALUES (NULL, ${msg.author.id}, 'archer', '1', '1', NULL, NULL, NULL, NULL, '6', '10', '10', '10', '10', '10', 'City');`);
          return msg.reply('Zostałeś: łucznikiem');
        }
        else if(reactions.has(three)&&!reactions.has(two)&&!reactions.has(one))
        {
          con.query(`INSERT INTO characters (id, id_user, class, lvl, exp, helmet, breastplate, trousers, shoes, weapon, hp, str, dex, inte, gold, place) VALUES (NULL, ${msg.author.id}, 'mag', '1', '1', NULL, NULL, NULL, NULL, '8', '10', '10', '10', '10', '10', 'City');`);
          return msg.reply('Zostałeś: MAGIEM');
        }
    return msg.reply('Wybierz swoją klasę!');
  })
    }
}