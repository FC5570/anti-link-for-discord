const { Client } = require("discord.js");
const client = new Client();
const AntiLink = require("../src/index");

client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
});

const antilink = new AntiLink({
  warnMsg: "Hey no links",
  muteCount: 5,
  kickCount: 10,
  banCount: 15,
});

client.on("message", async (message) => {
  antilink.handleInvites(message);
});

antilink.on('muteCountReached', (message, user, warns) => {
  message.guild.members.cache
    .get(user)
    .roles.add(message.guild.roles.cache.get("773911313230594089"));
  message.channel.send(
    `${
      client.users.cache.get(user).tag
    } has been muted for sending links. They had ${warns} warns.`
  );
});

antilink.on("kickCountReached", (message, user, warns) => {
  message.guild.members.cache.get(user).kick("Sending invite links.");
  message.channel.send(
    `${
      client.users.cache.get(user).tag
    } has been kicked. for sending links. They had ${warns} warns.`
  );
});

antilink.on("banCountReached", (message, user, warns) => {
  message.guild.members.cache
    .get(user)
    .ban({ reason: "Sending invite links." });
  message.channel.send(
    `${
      client.users.cache.get(user).tag
    } has been banned. for sending links. They had ${warns} warns.`
  );
});

client.login("your bot token");
