module.exports = async (client, reaction, user) => {
    if (reaction.partial) reaction = await reaction.fetch()

    client.reactionSnipes[reaction.message.channel.id] = {
        user: user,
        emoji: reaction.emoji,
        messageURL: reaction.message.url,
        createdAt: Date.now()
    }
}