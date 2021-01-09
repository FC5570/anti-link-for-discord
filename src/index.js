const db = require('quick.db')
const Discord = require('discord.js')
let arr = ['https', 'http', 'www', 'discord.gg', 'discordapp.com']


module.exports = async (client, message, options) => {
    let warnmsg = (options && options.warnmsg) || `<@${message.author.id}> sending links is prohibited.`;
    let muteCount = (options && options.muteCount);
    if(!muteCount) throw new Error('Specfiy a mute role.');

    let muteRole = (options && options.muteRole);
    if(!muteRole) throw new Error('Specfiy a mute role.');

    let kickCount = (options && options.kickCount);
    if(!kickCount) throw new Error('Specify the kick count.');

    let banCount = (options && options.banCount);
    if(!banCount) throw new Error('Specify the ban count.')

    const memberUser = message.member
    const user = message.author.id
    let warnCount = await db.fetch(`antilinkwarns_${message.guild.id}`)
    if(warnCount === null) warnCount = db.set(`antilinkwarns_${message.guild.id}_${user}`, 1)
    const role = message.guild.roles.cache.find(m => m.name === muteRole)

    let found = false;

    for (var i in arr) {
        if(message.content.toLowerCase().includes(arr[i].toLowerCase())) found = true
    }

    if(found) {
        if(memberUser.hasPermission("ADMINISTRATOR")) return;
        warnCount = db.add(`antilinkwarns_${message.guild}_${user}`, 1)
        message.delete();
        message.channel.send(`${warnmsg} | You currently have **${warnCount}** warning(s).`)

        if(warnCount === muteCount) {
         message.member.roles.add(role)
         await memberUser.send(`You've been muted in **${message.guild.name}**.\nReason: **Received ${warnCount} warnings for posting links.**`)
         message.channel.send(`**${memberUser.user.tag}** has been muted. Reason: Received **${warnCount}** warnings for posting links.`);
        }

        if(warnCount === kickCount) {
            message.channel.send(`**${memberUser.user.tag}** has been kicked. Reason: **Received ${warnCount} warnings for posting links.**`)
            await memberUser.send(`You've been kicked from **${message.guild.name}**.\nReason: **Received ${warnCount} warnings for posting links.**`)
            message.member.kick({reason: `Received ${warnCount} warnings for posting links.`})
        }

        if(warnCount === banCount) {
         message.channel.send(`**${memberUser.user.tag}** has been banned. Reason: Received **${warnCount} warnings for posting links.**`)
         await memberUser.send(`You've been banned from **${message.guild.name}**.\nReason: **Received ${warnCount} warnings for posting links.**`)
         message.member.ban({reason: `Received ${warnCount} warnings for posting links.`})
     }
     }
    }