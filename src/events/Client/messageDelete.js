export default async (client, message) => {
    if (message.partial || (!message.embeds.length && !message.content)) return; // content is non existant or the embed is removed

    client.msgSnipes[message.channel.id] = {
        author: message.author,
        content: message.content,
        createdAt: message.createdTimestamp,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    }
}