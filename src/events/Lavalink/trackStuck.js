const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {
    
    const channel = client.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
        .setColor("RED")
        .setDescription("❌ Error when loading song! Track is stuck");
    channel.send({embeds: [thing]});
    client.logger("errorEmitted", `Error when loading song! Track is stuck in [${player.guild}]`);
    if (!player.voiceChannel) player.destroy();

}