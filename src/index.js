const { EventEmitter } = require("events");
const { Message } = require("discord.js");
const linkReg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const discordReg = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g;

class AntiLinkClient extends EventEmitter {
  /**
   * @param {Object} options: The options for the AntiLinkClient
   * @param {String | Function} options.warnMessage: The warn message to send when a link/invite has been posted in chat
   * @param {Number} options.muteCount: The mute count to mute the user
   * @param {Number} options.kickCount: The kick count to mute the user
   * @param {Number} options.banCount: The ban count to mute the user
   * @param {Boolean} options.deleteMessage: Whether to delete the message (which is an invite or a link)
   * @param {Array.<String>} options.ignoredUsers: The IDs of users to ignore
   * @param {Array.<String>} options.ignoredChannels: The IDs of channels to ignore anti-links in
   * @param {Array.<String>} options.ignoredRoles: The roles a member should have to be ignored by anti-link filter
   */
  constructor(options) {
    super();
    this.options = options;
    this.warns = new Map();
  }

  /**
   * This initializes the AntiLinkClient and starts the anti-link filter
   * @param {Message} message: The message object
   */
  async handleMessages(message) {
    const check = this.inviteOrURL(message.content);
    const currentWarns = this.warns.get(message.author.id);

    if (check) {
      if (
        this.options.ignoredUsers &&
        this.options.ignoredUsers.includes(message.author.id)
      )
        return;
      if (
        this.options.ignoredChannels &&
        this.options.ignoredChannels.includes(message.channel.id)
      )
        return;
      if (
        this.options.ignoredRoles &&
        this.options.ignoredRoles.some((role) =>
          message.member.roles.cache.has(role)
        )
      )
        return;

      if (this.options.deleteMessage === true && message.deletable)
        message.delete();
      typeof this.options.warnMessage === "function"
        ? this.options.warnMessage(message)
        : message.channel.send({ content: this.options.warnMessage });
      this.warns.set(
        message.author.id,
        currentWarns === undefined ? 0 : currentWarns + 1
      );
    }

    switch (parseInt(this.warns.get(message.author.id))) {
      case parseInt(this.options.muteCount):
        this.emit("muteCountReached", message, message.author);
        break;

      case parseInt(this.options.kickCount):
        this.emit("kickCountReached", message, message.author);
        break;

      case parseInt(this.options.banCount):
        this.emit("banCountReached", message, message.author);
        break;
    }
  }

  /**
   * @param {String} string: The string to check if an invite or a url
   * @private
   */
  inviteOrURL(string) {
    if (string.match(linkReg)) return true;
    else if (string.match(discordReg)) return true;
    else return false;
  }
}

module.exports = AntiLinkClient;
