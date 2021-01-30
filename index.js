const Discord = require('discord.js');
const client = new Discord.Client();
const conf = require('./config.json');
const set = require('./selection/settings.json');
const db = require('quick.db')
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment') 
require('./util/eventLoader')(client);
var prefix = conf.prefix;


client.on("ready", async () => {
    client.user.setPresence({ activity: { name: "xxxx" }, status: "idle" });
    let botchannel = client.channels.cache.get(conf.botses);
    if (botchannel) botchannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  });


const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`${  files.undefined} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.elevation = message => {
  if (!message.guild) {
      return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === conf.sahip) permlvl = 5;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('ready', () => {
  console.log(client.user.username)
})

client.login(conf.token)
/// commands

client.sayilariCevir = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


client.on("guildMemberAdd", member => {
  member.roles.add(set.roller.unregister); 
});

client.on("guildMemberAdd", member => {
    member.setNickname(set.isimler.isimyas);
  });



client.emoji = function(x) {
    return client.emojis.cache.get(client.emojiler[x]);
  };
  const emoji = global.emoji;

  const sayiEmojiler = {
    0: "",//emoji 
    1: "",//emoji <a:0:801890703428943933> gibi // emojiyinin önüne "\" getirerek idyi alabilirsiniz
    2: "",//emoji 
    3: "",//emoji 
    4: "",//emoji 
    5: "",//emoji 
    6: "",//emoji 
    7: "",//emoji 
    8: "",//emoji 
    9: "" //emoji 
  };

  client.emojiSayi = function(sayi) {
    var yeniMetin = "";
    var arr = Array.from(sayi);
    for (var x = 0; x < arr.length; x++) {
      yeniMetin += (sayiEmojiler[arr[x]] === "" ? arr[x] : sayiEmojiler[arr[x]]);
    }
    return yeniMetin;
  };



client.on("guildMemberAdd", member=> {
let sunucu = client.guilds.cache.get(set.kanallar.guild);
let logKanal = sunucu.channels.cache.get(set.kanallar.kayıtkanal);
let register = sunucu.roles.cache.get(set.roller.yetkili);
let emojis = ""; // ŞÜPHELİ EMOJ;
let emojig = ""; // GÜVENLİ EMOJİ
let memberGün = moment(member.user.createdAt).format("DD");
let memberTarih = moment(member.user.createdAt).format("YYYY");
let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");

    if (member.user.bot) {
        member.roles.add(set.roller.botrol);
    }else{
        let durum = Date.now()-member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7
              if (logKanal) logKanal.send(`
**Sunucumuza hoşgeldin ${member} - \`${member.id}\`** :tada:

**Hesabın \`${memberGün} ${memberAylar} ${memberTarih}\` tarihinde açılmış. ${durum ? `${emojis}` : `${emojig}`}**

**Kayıt olmak için ses teyit vermelisin, seninle ${register} yetkisine sahip yetkililer ilgilenecektir.**

**Kayıt olduğunuzda kuralları okumuş sayılırsın ve buna göre işlemler uygulanır. Kuralları <#${set.kanallar.kurallar}> kanalında bulabilirsin.** 

**Seninle birlikte toplam ${client.emojiSayi(`${member.guild.memberCount}`)} kişiye ulaştık! Tagımızı \`(${set.taglar.tag})\` alarak bize destek olabilirsin!**:tada::tada:`)};

  

    Date.prototype.toTurkishFormatDate = function (format) {
        let date = this,
          day = date.getDate(),
          weekDay = date.getDay(),
          month = date.getMonth(),
          year = date.getFullYear(),
          hours = date.getHours(),
          minutes = date.getMinutes(),
          seconds = date.getSeconds();

        let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
        let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

        if (!format) {
          format = "dd MM yyyy | hh:ii:ss";
        };
        format = format.replace("mm", month.toString().padStart(2, "0"));
        format = format.replace("MM", monthNames[month]);

        if (format.indexOf("yyyy") > -1) {
          format = format.replace("yyyy", year.toString());
        } else if (format.indexOf("yy") > -1) {
          format = format.replace("yy", year.toString().substr(2, 2));
        };

        format = format.replace("dd", day.toString().padStart(2, "0"));
        format = format.replace("DD", dayNames[weekDay]);

        if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
        if (format.indexOf("hh") > -1) {
          if (hours > 12) hours -= 12;
          if (hours === 0) hours = 12;
          format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
        };
        if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
        if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
        return format;
      };
    });
