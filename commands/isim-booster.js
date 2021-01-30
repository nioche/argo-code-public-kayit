const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const set = require('../selection/settings.json')
const conf = require('../config.json')
module.exports.run = async (client, message, args) => {   
if(!message.member.roles.cache.has(set.roller.booster)) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsiniz.').setFooter(conf.status).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))).then(x => x.delete({timeout: 10000}));
let reklam = ['discord.gg', '.gg', 'gg', 'https', 'http', '.com', '.net']
if(reklam.some(r => isim.toLowerCase().includes(r))) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor('GOLD').setDescription('İsmine reklam içerikli şeyler koyamazsın.'))
let isim = args[0]
if(!isim) return message.react("❌")
let yas = Number(args[1])
if(!yas) return message.react("❌")
if(!message.member.user.username.includes(set.taglar.tag)) {
    message.member.setNickname(`${set.taglar.tagsız} ${isim} | ${yas}`)
} else if (message.member.user.username.includes(set.taglar.tag)) {
message.member.setNickname(`${set.taglar.tag} ${isim} | ${yas}`)
}  message.channel.send(new MessageEmbed().setColor('PURPLE').setDescription(`İsim değiştirme işlemi başarılı!`))

};
exports.conf = {
    enabled: true,
    aliases: ['bisim'],
    guildOnly: true,
    permlevel: 0
  };
  
  exports.help = {
      name: 'boosterisim'
  }