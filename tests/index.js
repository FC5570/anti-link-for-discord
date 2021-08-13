const AntiLinkClient = require("../src/index");
const { Client } = require("discord.js");
const client = new Client({ intents: ["GUILD_MESSAGES", "GUILDS"] });

const antilink = new AntiLinkClient({
  warnMessage: (message) => `${message.author.toString()}, No invite links!`,
  muteCount: 5,
  kickCount: 10,
  banCount: 15,
  deleteMessage: true,
});

client.on("ready", () => {
  console.log("Bot is online");
});

client.on("messageCreate", (message) => {
  antilink.handleMessages(message);
});

antilink.on("muteCountReached", (message, user) => {
  user.send("You have been muted for sending links");
  // mute the user here
});

antilink.on("kickCountReached", (message, user) => {
  user.send("You have been kicked for sending links");
  // kick the user here
});

antilink.on("banCountReached", (message, user) => {
  user.send("You have been banned for sending links");
  // ban the user here
});

client.login("token of the bot");
