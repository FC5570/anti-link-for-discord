const db = require('quick.db')
const Discord = require('discord.js')
let arr = ['https', 'http', 'www', 'discord.gg', 'discordapp.com']


module.exports = (client, message, options) => {
    let warnmsg = (options && options.warnmsg) || `<@${message.author.id}> sending links is prohibited.`;
    let muteRole = (options && options.muteRole);
    if(!muteRole) throw new Error('Specfiy a mute role.');

    let kickCount = (options && options.kickCount);
    if(!kickCount) throw new Error('Specify the kick count.');

    let banCount = (options && options.banCount);
    if(!banCount) throw new Error('Specify the ban count.')

    const member = message.member
    const warnCount = await db.fetch(`antilinkwarns_${message.guild.id}`)
    if(warnCount === null) warnCount = db.set(`antilinkwarns_${message.guild.id}_${member.id}`, 1)
    const role = message.guild.roles.cache.find(m => m.name === muteRole)

    let found = false;

    for (var i in arr) {
        if(message.content.toLowerCase().includes(arr[i].toLowerCase())) found = true
    }

    if(found) {
        if(member.hasPermissions("ADMINISTRATOR")) return;
        warnCount = db.add(`antilinkwarns_${message.guild}_${member.id}`, 1)
        message.delete();
        message.channel.send(`${warnMSG} | You currently have **${warnCount}** warning(s).`)

        if(warnCount === muteCount) {
         message.member.roles.add(mutedRoled)
         await member.send(`You've been muted in **${message.guild.name}**.\nReason: **Received ${warnCount} warnings for posting links.**`)
         message.channel.send(`**${member.tag}** has been muted. Reason: Received **${warnCount}** warnings for posting links.`);
        }

        if(warnCount === kickCount) {
            message.channel.send(`**${member.tag}** has been kicked. Reason: Received **${warnCount}** warnings for posting links.`)
            await member.send(`You've been kicked from **${message.guild.name}**.\nReason: **Received ${warnCount} warnings for posting links.**`)
            await message.member.kick({reason: `Received ${warnCount} warnings for posting links.`})
        }

        if(warnCount === banCount) {
         message.channel.send(`**${member.tag}** has been banned. Reason: Received **${warnCount} warnings for posting links.`)
         await member.send(`You've been banned from **${message.guild.name}**.\nReason: **Received ${warnCount} warnings for posting links.**`)
         await message.member.ban({reason: `Received ${warnCount} warnings for posting links.`})
     }
     }
    }