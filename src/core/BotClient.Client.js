import { Client, Collection, Intents } from "discord.js";
import { Manager } from "erela.js";
import mongoose from "mongoose";
import { Database } from "quickmongo";
import { readdirSync } from "node:fs";
import Logger from "../modules/helpers/Logger"

export class Bot extends Client {
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
		this.config = require('../config/config');
		this.global_config = process.env;
		this.logger = Logger;

		// Snipe Collections
		this.messageSnipes = {};
		this.editSnipes = {};
		this.reactionSnipes = {};
	}
	// Functions

	loadBotEvents() {
		readdirSync('../events/Client/').forEach((file) => {
			const event = require(`../events/Client/${file}`);
			const eventName = file.split('.')[0];
			this.logger.eventLoaded(`Client Event -> ${eventName} Has Loaded`);
			this.on(eventName, event.bind(null, this));
		});
	}

	loadLavalinkEvents() {
		readdirSync('../events/Lavalink/').forEach((file) => {
			const event = require(`../events/Lavalink/${file}`)
			const eventName = file.split('.')[0]
			this.logger.eventLoaded(`Lavalink Event -> ${eventName} Has Loaded`)
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
		this.loadLavalinkEvents()
	}
}
