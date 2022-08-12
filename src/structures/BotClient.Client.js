import { Client, Collection, Intents } from "discord.js";
import { Manager } from "erela.js";
import mongoose from "mongoose";
import "dotenv" // for NodeJSProcess class
import quickmongo from "quickmongo";
import config from "../config/config.js"
const Spotify = import("better-erela.js-spotify").default
import Deezer from "erela.js-deezer"
import { Database } from "quickmongo";
import { readdirSync } from "node:fs";
import Logger from "../modules/helpers/Logger.js"

export default class Bot extends Client {
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
		this.global_config = process.env;
		this.logger = new Logger(this);
		this.utils = new Utils(this)

		// Snipe Collections
		this.messageSnipes = {};
		this.editSnipes = {};
		this.reactionSnipes = {};

		// MongoDB Database stuff

	}
	// Functions

	loadEvents() {
		readdirSync('../events/client').forEach((file) => {
			const event = require(`../events/client/${file}`)
			let eventName = file.split('.')[0]
			this.logger.("eventLoaded", `Loaded Event -> ${eventName}`)
		});
	}

	initMongoDB() {
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
			this.logger("eventLoaded", "[DB]: Successfully Connected To MongoDB Atlas")
		})

		mongoose.on('disconnected', () => {
			this.logger("errorEmitted", "[DB]: Lost Connection To The Database, Please Wait While It Reconnects")
		})

		mongoose.on('err', (error) => {
			this.logger("errorEmitted", `[DB]: An Error Has Occured -> ${error}`)
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
