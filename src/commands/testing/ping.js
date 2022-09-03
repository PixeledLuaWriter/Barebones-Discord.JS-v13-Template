const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    description: "A Test Command/Dummy Command",
    botpermission: [],
    permission: [],
    owner: false,
    async execute (message, args, client, prefix) {
        return message.channel.send({embeds: [
            new MessageEmbed()
            .setTitle("Test")
            .setColor(client.embedColor)
            .setDescription("Pong!~")
        ]})
    }
}