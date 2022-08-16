export default async (client, oldMsg, newMsg) => {
    if (oldMsg.partial) return; // the message content is null
    client.editSnipes[oldMsg.channel.id] = {
        author: oldMsg.author,
        content: oldMsg.content,
        createdAt: newMsg.editedTimestamp
    }
}