import { MessageEmbed } from "discord.js";

export default async (client, guild) => {
	client.users.fetch(`${client.owner}`).then(user => {
        user.send({embeds: [
			new MessageEmbed()
			.setTitle("Alert")
			.setDescription(`🔔 Left/Got Kicked From A Guild 🔔`)
			.setColor(client.embedColor)
			.addField("Guild", `${guild.name} - (${guild.id})`)
			.addField("Total Members", `${guild.members.cache.size}`)
		]});
	})
}