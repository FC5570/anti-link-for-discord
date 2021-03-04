const db = require("quick.db");
let arr = ["https", "http", "www", "discord.gg", "discordapp.com"];
const { EventEmitter } = require("events");

class AntiLink extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }

  async handleInvites(message) {
    if (message.guild) {
      let warnCount = await db.fetch(
        `antilinkwarns_${message.guild.id}_${message.author.id}`
      );
      if (warnCount === null)
        warnCount = db.set(
          `antilinkwarns_${message.guild.id}_${message.author.id}`,
          0
        );

      let found = false;

      for (var i in arr) {
        if (message.content.toLowerCase().includes(arr[i].toLowerCase()))
          found = true;
      }

      if (found) {
        warnCount = db.add(
          `antilinkwarns_${message.guild.id}_${message.author.id}`,
          1
        );
        message.delete();
        const m = this.options.warnMsg
          ? `${this.options.warnMsg} | You currently have **${warnCount}** warning(s)`
          : `Sending links in this server is not allowed. | You currently have **${warnCount}** warning(s).`;
        message.channel.send(m);

        if (warnCount === parseInt(this.options.muteCount)) {
          this.emit("muteCountReached", message, message.author.id, warnCount);
        }

        if (warnCount === parseInt(this.options.kickCount)) {
          this.emit("kickCountReached", message, message.author.id, warnCount);
        }

        if (warnCount === parseInt(this.options.banCount)) {
          this.emit("banCountReached", message, message.author.id, warnCount);
        }
      }
    }
  }
}
module.exports = AntiLink;
