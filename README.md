# anti-link-for-discord

Anti Links package for Discord, prevents links from being posted in chat.

## Installation
```
npm i anti-link-for-discord
```

## Usage

```
const AntiLink = require('anti-link-for-discord')
const antilink = new AntiLink({
warnMsg = "the message to send when a user sends an invite."
muteCount: "the mute role count to mute members when they send links.",
kickCount: "same as the above, the count to kick members when they send links",
banCount: "the count to ban members when they send links",
muteRoleID: "the ID of the role to add to users when they get muted."
})

<client>.on("message", (message) => {
    antilink.handleInvites(message)
})
         muteCount, kickCount, banCount, muteRoleID
```

## Example Usage:
```
const { Client } = require('discord.js')
const AntiLink = require('anti-link-for-discord')
const client = new Client()

const antilink = new AntiLink({
warnMsg: "Please dont send any links."
muteCount: 5,
kickCount: 10,
banCount: 15,
muteRoleID: "741998491609595985"
})

client.on("message", (message) => {
    antilink.handleInvites(message)
})

client.login('bot token')
```

## Important Links:
[Github Repository](https://github.com/FC5570/anti-link-for-discord)

### If you encounter any issues, please DM me on Discord: FC#5104