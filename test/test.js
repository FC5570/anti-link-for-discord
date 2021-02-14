const { Client } = require("discord.js");
const client = new Client()
const AntiLink = require("../src/index");

client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
});

const antilink = new AntiLink({
warnMsg: "Hey no links",
  muteCount: 5,
  kickCount: 10,
  banCount: 15,
  muteRoleID: "773911313230594089",
});

client.on("message", async (message) => {
  antilink.handleInvites(message);
});

client.login("your bot token");
