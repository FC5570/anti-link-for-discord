# anti-link-for-discord

Anti Links package for Discord, prevents links from being posted in chat.

### Note: Please update to v5.0.0+ for a better and accurate anti-link system.

## Installation

```bash
npm i anti-link-for-discord
yarn add anti-link-for-discord (if you're using yarn)
```

## Example

```js
const AntiLinkClient = require("../src/index");
const { Client } = require("discord.js");
const client = new Client({ intents: ["GUILD_MESSAGES", "GUILDS"] });

const antilink = new AntiLinkClient({
  warnMessage: (message) => `${message.author.toString()}, No links.`,
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
```

## Events

1. 'muteCountReached' _(message, user)_ - Emitted when a member sends links as many times as specified in AntiLinkOptions.muteCount
2. 'kickCountReached' _(message, user)_ - Emitted when a member sends links as many times as specified in AntiLinkOptions.kickCount
3. 'banCountReached' _(message, user)_ - Emitted when a member sends links as many times as specified in AntiLinkOptions.banCount

## API

### AntiLinkClient.constructor(options)

`options` is an object which can contain the following:

1. **warnMessage** (string or a function): Sent when a user sends a link or an invite in chat. Can be either a string or a function, a message is sent in the channel if the type of warnMessage is string, or the function is called if the type is a function.
2. **muteCount** (number): The amount of times a user has to send a link or an invite to be muted (muteCountReached event is emitted).
3. **kickCount** (number): The amount of times a user has to send a link or an invite to be kicked (kickCountReached event is emitted).
4. **banCount** (number): The amount of times a user has to send a link or an invite to be banned (banCountReached event is emitted).
5. **deleteMessage** (boolean): Whether to delete the message (which is a link or an invite).
6. **ignoredUsers** (array): An array of user IDs to ignore.
7. **ignoredChannels** (array): An array of channel IDs to ignore.
8. **ignoredRoles** (array): An array of role IDs to ignore (the users with those roles will be ignored).

### AntiLinkClient.handleMessages(message)

This will initialize the AntiLinkClient and start the anti-link filter.

### If you encounter any issues, please DM me on Discord: FC#5104
