const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const set = require('../selection/settings.json')
const conf = require('../config.json')
module.exports.run = async (client, message, args) => {
 if(!message.member.roles.cache.has(set.roller.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Bu komudu kullanmak için gerekli izilnere sahip değilsin.')).then(x => x.delete({timeout: 10000}));
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed().setColor('RED').setDescription('Lütfen bir kullanıcı etiketleyin.')).then(x => x.delete({timeout: 10000}));


   member.roles.add(set.roller.unregister)
member.setNickname(`${set.isimler.isimyas}`)
  member.roles.cache.forEach(r => {
  member.roles.remove(r.id)
  })

message.react("✅")

};

exports.conf = {
    enabled: true,
    aliases: ['kayıtsız'],
    guildOnly: true,
    permlevel: 0
  };
  
  exports.help = {
      name: 'kayıtsız'
  }