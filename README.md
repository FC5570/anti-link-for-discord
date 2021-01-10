# anti-link-for-discord
 Anti Links package for Discord, prevents links from being posted in chat.

## Usage 
```
const antiLink = require('anti-link-for-discord')

        antiLink(message, {
            warnmsg: `<@${message.author.id}> sending links is prohibited.`, // warn message to send when someone posts a link, default is the provided text.
            muteRole: "ROLE NAME",  // Name of the Mute Role to add to user.
            muteCount: 10,        // Number of warnings when the user should be muted
            kickCount: 20,        // Number of warnings when the user should get kicked
            banCount: 30,         // Number of warnings when the user should get banned
        });
```
