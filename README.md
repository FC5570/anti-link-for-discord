# anti-link-for-discord

Anti Links package for Discord, prevents links from being posted in chat.

## Installation

```
npm i anti-link-for-discord
yarn add anti-link-for-discord (if you're using yarn)
```

## Events

#### muteCountReached

Is emmited once a user's warnings are equal to the mute count warnings, returns message, the user's ID and the warnCount.

#### kickCountReached

Is emmited once a user's warnings are equal to the kick count warnings, returns message, the user's ID and the warnCount.

#### banCountReached

Is emmited once a user's warnings are equal to the ban count warnings, returns message, the user's ID and the warnCount.

## Usage

```
const AntiLink = require('anti-link-for-discord')
const antilink = new AntiLink({
warnMsg: "the message to send when a user sends an invite.",
muteCount: "the mute role count to mute members when they send links.",
kickCount: "same as the above, the count to kick members when they send links",
banCount: "the count to ban members when they send links",
})

<client>.on("message", (message) => {
    antilink.handleInvites(message)
})

antilink.on('muteCountReached', (message, user, warnCount) => {
    message.channel.send(`${client.users.cache.get(user).tag} has been Muted for posting invite links. They had ${warnCount} warns.`)
})

antilink.on('kickCountReached', (message, user, warnCount) => {
    message.channel.send(`${client.users.cache.get(user).tag} has been Kicked for posting invite links. They had ${warnCount} warns.`)
})

antilink.on('banCountReached', (message, user, warnCount) => {
    message.channel.send(`${client.users.cache.get(user).tag} has been Banned for posting invite links. They had ${warnCount} warns.`)
})

```

## Example Usage:

```
const { Client } = require("discord.js");
const client = new Client();
const AntiLink = require("anti-link-for-discord");

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
})

antilink.on('muteCountReached', (message, user, warns) => {
  message.guild.members.cache.get(user).roles.add(message.guild.roles.cache.get('mute role ID'))
  message.channel.send(`${client.users.cache.get(user).tag} has been muted for sending links. They had ${warns} warns.`)
})

antilink.on('kickCountReached', (message, user, warns) => {
  message.guild.members.cache.get(user).kick("Sending invite links.")
  message.channel.send(`${client.users.cache.get(user).tag} has been kicked. for sending links. They had ${warns} warns.`)
})

antilink.on('banCountReached', (message, user, warns) => {
  message.guild.members.cache.get(user).ban({reason:"Sending invite links."})
  message.channel.send(`${client.users.cache.get(user).tag} has been banned. for sending links. They had ${warns} warns.`)
})

client.login("your bot token");
```

## Important Links:

[Github Repository](https://github.com/FC5570/anti-link-for-discord)

### If you encounter any issues, please DM me on Discord: FC#5104
