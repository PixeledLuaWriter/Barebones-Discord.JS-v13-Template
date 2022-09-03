const { Client, Collection, Intents } = require("discord.js");
const { Manager } = require("erela.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // for NodeJSProcess class to use .env files
const config  = require("../config/config.js");
const Spotify = require("better-erela.js-spotify").default
const Deezer = require("erela.js-deezer")
const { Database } = require("quickmongo");
const { readdirSync } = require("node:fs");
const Logger = require("../modules/helpers/Logger.js");
const Utils = require("../modules/helpers/Utils.js")

dotenv.config()

module.exports = class Bot extends Client {
	constructor() {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_INVITES,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_VOICE_STATES,
			],
			allowedMentions: {
				parse: ['everyone', 'roles', 'users'],
				repliedUser: true
			},
			partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER']
		});

		// Adding The Command Collections
		this.commands = new Collection();
		this.aliases = new Collection();
		this.slashCommands = new Collection();

		// Configuration Stuff / Miscellaneous Bullshit
		this.config = config;
		this.categories = readdirSync('../commands/');
		this.global_config = process.env;
		this.logger = new Logger(this);
		this.utils = new Utils(this)

		// Snipe Collections
		this.messageSnipes = {};
		this.editSnipes = {};
		this.reactionSnipes = {};

	}
	// Functions

	loadEvents() {
		readdirSync('../events/client').forEach((file) => {
			const event = require(`../events/client/${file}`)
			let eventName = file.split('.')[0]
			this.logger.log("eventLoaded", `Loaded Event -> ${eventName}`)
			this.on(eventName, event.bind(null, this))
		});
		readdirSync('../events/lavalink').forEach((file) => {
			const levent = await import(`../events/lavalink/${file}`)
			let levent_name = file.split(".")[0]
			this.logger.log("eventLoaded", `Loaded Lavalink Event -> ${levent_name}`)
			this.manager.on(levent_name, levent.bind(null, this))
		});
	}

	async initMongoDB() {
		mongoose.connect(this.global_config.mongo_uri, {
			useNewUrlParser: true,
			autoIndex: false,
			poolSize: 5,
			connectTimeoutMS: 10000,
			family: 4,
			useUnifiedTopology: true,
			useFindAndModify: false
		})

		/**
		* Setting The Promise On Mongoose Itself
		*/

		mongoose.Promise = global.Promise

		/**
		* Handling Emitted Events On Mongoose
		**/

		mongoose.on("connected", () => {
			this.logger.log("eventLoaded", "[DB]: Successfully Connected To MongoDB Atlas")
		})

		mongoose.on('disconnected', () => {
			this.logger.log("errorEmitted", "[DB]: Lost Connection To The Database, Please Wait While It Reconnects")
		})

		mongoose.on('err', (error) => {
			this.logger.log("errorEmitted", `[DB]: An Error Has Occured -> ${error}`)
		})
	}

	async initLavalink() {
		this.manager = new Manager({
			nodes: this.config.nodes,
			send(id, payload) {
				const guild = super.guilds.cache.get(id)
				if(guild) guild.shard.send(payload)
			},
			autoPlay: true,
			plugins: [
				new Spotify({
					strategy: "API",
					clientId: this.global_config.spotify_clientID,
					clientSecret: this.global_config.spotify_secret,
					convertUnresolved: true,
					showPageLimit: 10,
					playlistPageLimit: 10,
					albumPageLimit: 10
				}),
				new Deezer()
			]
		})
	}

	async resolveUser(search) {
		let user = null;
		if (!search || typeof search !== 'string') {
			return;
		}

		// Initiate ID Searching
		if (search.match(/^<@!?(\d+)>$/)) {
			const id = search.match(/^<@!?(\d+)>$/)[1]
			user = this.users.fetch(id).catch(() => {})
			if (user) {
				return user;
			}
		}

		// Initiate Search By Discord Username & Discriminator
		if (search.match(/^!?(\w+)#(\d+)$/)) {
			const username = search.match(/^!?(\w+)#(\d+)$/)[0]
			const discriminator = search.match(/^!?(\w+)#(\d+)$/)[1]
			user = this.users.find((ActualUser) => ActualUser.username === username && ActualUser.discriminator === discriminator)
		}
	}

	async login() {
		if (!this.global_config.token) {
			throw new Error('You must have a token specified in your configuration environment')
		}
		super.login(this.global_config.token)
	}

	async initiate() {
		console.clear()
		this.login()
		this.loadBotEvents()
	}
}
