const main = require("./configs/main.json");
const desc = require("./configs/descriptions.json")
const Eris = require("eris");

// Preloaders-1
var bot = new Eris(main.token);
var prefix = (main.prefix);

// Preloaders-2
if (main.publicBot == true) {
	bot.on("guildCreate", (guild) => {
		bot.createMessage(guild.defaultChannel.id, `Hey, thanks for adding me to your server! to use me, do ${"`" + prefix + "help`"} !`)
	});
} else if (main.publicBot == false) {
	// No join message!
}

bot.on("messageCreate", (msg) => {
	var ownerParser = (main.ownerID)

	// Preloaders-3
	function sendMessage(message) {
		bot.createMessage(channelID, message)
	}
	var message = msg.content;
	var messageID = msg.id;
	var channelID = msg.channel.id;

	if (message.startsWith(`${prefix}ping`)) {
		sendMessage("Pang!")
	}
	if (desc.mainServer.enabled == false) {
		if (message.startsWith(`${prefix}server`)) {
			sendMessage(`I am not enabled to display an invite to my server, because my owner said so.`)
		}
	} else if (desc.mainServer.enabled == true) {
		if (message.startsWith(`${prefix}server`)) {
			sendMessage(`Heres an invite link to my official server! **${desc.mainServer.inviteURL}**`)
		}
	}

	if (main.publicBot == true) {
		if (message.startsWith(`${prefix}invite`)) {
			sendMessage(`Invite me to your server! https://discordapp.com/oauth2/authorize?&client_id=${bot.user.id}&scope=bot`)
		}
	} else if (main.publicBot == false) {
		if (message.startsWith(`${prefix}invite`)) {
			sendMessage(`Im sorry! This is not a public bot`)
		}	
	}
	if (message.startsWith(`${prefix}info`)) {
		sendMessage(`
**${desc.botName} - ${desc.botDescription} owned by ${main.ownerID}, coded by a person called Momiji!**

Currently in: **${bot.guilds.size}** servers!
`)
	}
	if (message.startsWith(`${prefix}help`)) {
		sendMessage(`help:\n\n${"```\n"}${prefix}ping - Sends a message to test if the bot is up\n${prefix}info - Bot info\n${prefix}invite - Displays an invite for me!\n${prefix}server - Displays an invite to my official server!${"\n```"}`)
	}
	if (msg.author.id === ownerParser) {
	    if (message.startsWith(`${prefix}eval `)) {
	        var args = message.split(`${prefix}eval `).join("");
	        try {
	            var evald = eval(args);
	            bot.createMessage(channelID, `${"```js\n"}input: ${args}\n\noutput: ${evald}\n${"```"}`)
	        } catch (e) {
	            bot.createMessage(channelID, `${"```js\n"}input: ${args}\n\noutput: ${e}${"```"}`)
	        }
	    }
	} else {
	    if (message.startsWith(`${prefix}eval`)) {
	        bot.createMessage(channelID, "You are not the owner of this bot!")
	    }
	}
});

bot.on("ready", () => {
    console.log(`
${desc.botName} - ${desc.botDescription}
Current Prefix: ${prefix}
Server Count: ${bot.guilds.size}
`);
    bot.editGame({ name: `${desc.gameName}` })
});

bot.connect();
