const { MessageEmbed } = require("discord.js");

export default async (client, player, track, payload) => {

    console.error(payload.error);

    const channel = client.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
        .setColor("RED")
        .setDescription("❌ Error while loading your song, the track has encountered an error");
    channel.send({embeds: [thing]});
    client.logger("errorEmitted", `Error when loading song! Track is error in [${player.guild}]`);
    if (!player.voiceChannel) player.destroy();

}