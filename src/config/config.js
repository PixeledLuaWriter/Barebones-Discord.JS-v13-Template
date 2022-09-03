/**
	This is the configuration file for the bot
	the configuration data is deepfrozen to prevent any kind of
	exploits into the config file to overwrite stuff.
	This also means that it is tamper protected as nothing
	can be overwritten since the entire configuration is immutable.
*/

/**
 * @name Deepfreeze
 * @description Freezes A Given Object Recursively, Essentially Freezing All Properties And Anything Else Inside The Object
 * @param {Object} object 
 * @returns {object}
 */

function deepFreeze(object) {
	const propNames = Object.getOwnPropertyNames(object);
	for (const name of propNames) {
		const value = object[name]
		if(value && typeof value === "object") {
			deepFreeze(value);
		}
	}
	return Object.freeze(object);
}

module.exports = deepFreeze({
	nodes: {
		id: "Main",
		host: "your hosting url here",
		port: 440,
		identifier: "@BarebonesTemplate", // My Suggestion is to use repl.it for hosting unless your doing it yourself via local server
		password: "youshallnotpass", // default password [SET YOUR OWN OPRIONALLY]
		retryAmount: 10,
		retryDelay: 3000,
		secure: true
	},
	emojis: {
		mute: "🔇",
		volumelow: "🔈",
		volumemiddle: "🔉",
		volumehigh: "🔊",
		stop: "⏹️",
		skip: "⏭️",
		shuffle: "🔀",
		rewind: "⏪",
		resume: "▶️",
		remove: "⏏️",
		queue: "🎶",
		playlist: "🎶",
		play: "▶️",
		pause: "⏸️",
		loop: "🔁",
		forward: "⏩",
		filter: "🎛️",
		autoplay: "🎵",
		addsong: "🎵",
		music: "🎵",
		warn: "⚠️",
		join: "📥",
		leave: "📤",
		about: "🔎",
		jump: "⏭️"
	},
	prefix: ".>", // Placeholder Prefix [SET YOUR OWN OPTIONALLY]
	ownerID: "Your Discord Client ID Here",
	embedColor: "#ffefb0"
})
