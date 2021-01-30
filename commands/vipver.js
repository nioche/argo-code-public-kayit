const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const conf  = require('../config.json')
const set = require('../selection/settings.json')
module.exports.run = async(client, message, args) => {


if(!message.member.roles.cache.has(set.roller.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}).setColor('GREEN').setFooter(conf.status)).setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsin.')).then(x => x.delete({timeout: 15000}));
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
if(!member) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED').setFooter(conf.status).setDescription('Lütfen bir kullanıcı etiketleyin.')).then(x => x.delete({timeout: 15000}));
if(message.member.roles.highest.position >= member.roles.highest.position) return message.react("❌").then(x => x.delete({timeout: 5000}));

member.roles.add(set.roller.vip)

message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('GREEN').setFooter(conf.status).setDescription(`${member} kullanıcıya ${set.roller.vip} rolü başarıyla verildi`)


)};

exports.conf = {
    enabled: true,
    aliases: ['vipver'],
    guildOnly: true,
    permlevel: 0
  };
  
  exports.help = {
      name: 'vipver'
  }