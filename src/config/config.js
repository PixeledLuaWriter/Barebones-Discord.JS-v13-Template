/**
	This is the configuration file for the bot
	the configuration data is deepfrozen to prevent any kind of
	exploits into the config file to overwrite stuff.
	This also means that it is tamper protected as nothing
	can be overwritten since the entire configuration is immutable.
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
		identifier: "@BarebonesTemplate",
		password: "youshallnotpass", // default password [SET YOUR OWN OPRIONALLY]
		retryAmount: 10,
		retryDelay: 3000,
		secure: true
	},
	prefix: ".>", // Placeholder Prefix [SET YOUR OWN OPTIONALLY]
	ownerID: "your account id here",
	embedColor: "#ffefb0"
})
