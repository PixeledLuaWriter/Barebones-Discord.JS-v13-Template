const { MessageEmbed } = require("discord.js")

module.exports = async (client, guild) => {
	client.users.fetch(`${client.owner}`).then(user => {
        user.send({embeds: [
			new MessageEmbed()
			.setTitle("Alert")
			.setDescription(`🔔 Joined A Guild 🔔`)
			.setColor(client.embedColor)
			.addField("Guild", `${guild.name} - (${guild.id})`)
			.addField("Total Members", `${guild.members.cache.size}`)
		]});
	})
	guild.commands.set(client.data)
}