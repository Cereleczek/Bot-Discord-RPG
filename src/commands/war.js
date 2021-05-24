const { Collection, Message } = require("discord.js");
const mysql = require("mysql");
const map = new Collection;
time =2000;
module.exports = {
    name: 'war',
    description: 'war',
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
      if(map.has(msg.author.id))
      return;
      map.set(msg.author.id);
      //let mob = {dmg: 1, hp: 1, armor: 0, lvl: 1, name: "Monster", Damage:1};
      //let player ={str: 0, dex: 0, inte: 0, hp: 1, armor: 0, lvl: 1, exp: 0, min: 1, max: 2, class: "nic", place: undefined, Damage:1 };
      let player = {}
      playert = await statsPlayer(player);
      if(Object.keys(player).length === 0 && player.constructor === Object)
      return map.delete(msg.author.id)
      playert = await weapons(player);
      let mob = {}
      mob = await statsMob(mob, player)
      player = real(player, mob)
      mob = real(mob, player)
      let message = await msg.channel.send("Twoje HP: "+player.hp+"\n"+mob.name+" jego HP: "+mob.hp)
      while(player.hp>0 && mob.hp>0)
      {
        mob = await fight(player, mob, message)
        console.log("Twoje HP: "+player.hp+"\n"+mob.name+" jego HP: "+mob.hp)
        if(mob.hp>0)
        player = await fight2(player, mob, message)
        console.log("Twoje HP: "+player.hp+"\n"+mob.name+" jego HP: "+mob.hp)
      }
      if(player.hp>0)
      msg.reply("pokonałeś "+mob.name)
      else
      msg.reply(mob.name+ "pokonał cię")
      return map.delete(msg.author.id);
      /******************************************************************************************************/
      /*                                           My functions                                             */
      function statsPlayer (player){
        return new Promise(resolve => {
          con.query(`SELECT * FROM characters WHERE id_user = ${msg.author.id}`, (err, rows) =>{
            if(!rows.length)
            resolve (null);
            for(let key of rows)
            {
              player.str = key.str;
              player.dex = key.dex;
              player.inte = key.inte;
              player.hp = key.hp;
              player.lvl = key.lvl;
              player.exp = key.exp;
              player.class = key.class;
              player.place = key.place;
              player.helmet = key.helmet;
              player.breastplate = key.breastplate;
              player.trousers = key.trousers;
              player.shoes = key.shoes;
              player.weapon = key.weapon;
            }
            resolve (player);
          })
      })
    }
      function weapons (player){
        return new Promise(resolve => {
          con.query(`SELECT * FROM items WHERE id_item IN (${player.helmet}, ${player.breastplate}, ${player.trousers}, ${player.shoes}, ${player.weapon})`, (err, rows) =>{
            player.armor=0;
            player.min=1;
            player.max=2;
            for(let key of rows)
            {
              player.str += key.str;
              player.inte += key.inte;
              player.dex += key.dex;
              player.hp += key.hp;
              player.armor += key.armor;
              player.min += key.min_dam;
              player.max += key.max_dam;
            }
            resolve(player);
          })
        })
      }
      function statsMob (mob, player)
      {
        return new Promise(resolve => {
          con.query(`SELECT * FROM monsters_${player.place}`, (err, rows) =>{
            const m = Math.floor(Math.random() * rows.length);
            mob.name = rows[m].monster_name;
            mob.str = rows[m].monster_str;
            mob.min = rows[m].monster_dmg;
            mob.max = rows[m].monster_max;
            mob.hp = rows[m].monster_hp;
            mob.armor = rows[m].monster_armor;
            mob.lvl = rows[m].monster_lvl;
              resolve(mob);
          })
        })
      }
    function real(player, mob)
    {
      if(!player.hasOwnProperty('class'))
      {
        player.hp *= 3*(1+player.lvl)
        player.armor=Math.round(( player.armor/mob.lvl>50) ? 50 :  player.armor);
        player.Damage = 1+player.str/10
        return player
      }
      player.armor/=mob.lvl
      mob.armor/=player.lvl
      if(player.class==="warrior")
      {
        player.hp *= 5*(1+player.lvl)
        player.armor=Math.round((player.armor/mob.lvl>50) ? 50 : player.armor);
        player.Damage = 1+player.str/10
      }
      else if(player.class==="archer")
      {
        player.hp *= 4*(1+player.lvl)
        player.armor= Math.round((player.armor/mob.lvl>25) ? 25 : player.armor);
        player.Damage = 1+player.dex/10
      }
      else
      {
        player.hp *= 2*(1+player.lvl)
        player.armor=Math.round((player.armor/mob.lvl>15) ? 15 : player.armor);
        player.Damage = 1+player.inte/10
      }
        return player;
    }
    function fight (player, mob, message)
    {
      return new Promise(resolve => {
      const damage = player.Damage*(Math.random() * (player.max+1-player.min)) + player.min
        if(player.class=="mag")
        {
          mob.hp -= Math.round(damage);
        }
        else if(player.class=="archer")
        {
          mob.hp -= Math.round(damage*(100-mob.armor)/100)
        }
        else
        {
          mob.hp -= Math.round(damage*(100-mob.armor)/100)
        }
        setInterval(async () => {
        await message.edit("Twoje HP: "+player.hp+"\n"+mob.name+" jego HP: "+mob.hp)
        resolve(mob)
        }, time)
      })
    }
    function fight2 (player, mob, message)
    {
      return new Promise(resolve => {
      const damage = mob.Damage*(Math.random() * (mob.max+1-mob.min)) + mob.min
        if(player.class=="mag")
        {
          player.hp -= Math.round(damage*(100-player.armor)/100)
        }
        else if(player.class=="archer")
        {
          player.hp -= Math.round(damage*(100-player.armor)/100)
        }
        else
        {
          player.hp -= Math.round(damage*(100-player.armor)/100)
        }
        setInterval(async () => {
          await message.edit("Twoje HP: "+player.hp+"\n"+mob.name+" jego HP: "+mob.hp)
          resolve(player)
          }, time)
      })
    }
      /******************************************************************************************************/
      }
  }
