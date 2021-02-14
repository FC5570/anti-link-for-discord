const db = require("quick.db");
const Discord = require("discord.js");
let arr = ["https", "http", "www", "discord.gg", "discordapp.com"];

class AntiLink {
  constructor(options) {
    this.options = options;
  }

  async handleInvites(message) {
    const memberUser = message.member;
    if (message.guild) {
      let warnCount = db.fetch(`antilinkwarns_${message.guild.id}`);
      if (warnCount === null)
        warnCount = db.set(
          `antilinkwarns_${message.guild.id}_${memberUser.id}`,
          1
        );
      const role = message.guild.roles.cache.get(this.options.muteRoleID);

      let found = false;

      for (var i in arr) {
        if (message.content.toLowerCase().includes(arr[i].toLowerCase()))
          found = true;
      }

      if (found) {
        warnCount = db.add(`antilinkwarns_${message.guild}_${warnCount}`, 1);
        message.delete();
        const m = this.options.warnMsg
          ? `${this.options.warnMsg} | You currently have **${warnCount}** warning(s)`
          : `Sending links in this server is not allowed. | You currently have **${warnCount}** warning(s).`;
        message.channel.send(m);

        if (warnCount === parseInt(this.options.muteCount)) {
          await message.member.roles.add(role);
          memberUser.send(
            `You've been muted in **${message.guild.name}**.\nReason: **Received ${warnCount} warnings for posting links.**`
          );
          message.channel.send(
            `**${memberUser.user.tag}** has been muted. Reason: Received **${warnCount}** warnings for posting links.`
          );
        }

        if (warnCount === parseInt(this.options.kickCount)) {
          message.channel.send(
            `**${memberUser.user.tag}** has been kicked. Reason: **Received ${warnCount} warnings for posting links.**`
          );
          await memberUser.send(
            `You've been kicked from **${message.guild.name}**.\nReason: **Received ${warnCount} warnings for posting links.**`
          );
          await message.member.kick(
            `Received ${warnCount} warnings for posting links.`
          );
        }

        if (warnCount === parseInt(this.options.banCount)) {
          message.channel.send(
            `**${memberUser.user.tag}** has been banned. Reason: Received **${warnCount} warnings for posting links.**`
          );
          await memberUser.send(
            `You've been banned from **${message.guild.name}**.\nReason: **Received ${warnCount} warnings for posting links.**`
          );
          await message.member.ban({
            reason: `Received ${warnCount} warnings for posting links.`,
          });
        }
      }
    }
  }
}
module.exports = AntiLink;
