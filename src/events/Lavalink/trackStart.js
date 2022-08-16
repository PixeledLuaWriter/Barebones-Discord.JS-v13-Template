import { MessageEmbed } from "discord.js";
import { convertTime } from '../../utils/convert.js';

export default async (client, player, track, payload) => {
    const channel = client.channels.cache.get(player.textChannel);
    const emojiplay = client.emoji.play;

    const thing = new MessageEmbed()
        .setDescription(`${emojiplay} **Started Playing**\n [${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\` [<@${track.requester.id}>]`)
        .setThumbnail(track.displayThumbnail("3"))
        .setColor(client.embedColor)
        .setTimestamp()
    return channel.send({embeds: [thing]});
    
}