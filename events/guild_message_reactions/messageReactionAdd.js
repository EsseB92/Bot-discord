const ownerId = process.env.OWNER_ID

export const name = 'messageReactionAdd';
export const once = false;
export async function execute(client, messageReaction, user) {
    const message = messageReaction.message;
    const reactionEmoji = messageReaction.emoji;
    const guildMember = message.guild.members.cache.get(user.id);
    // 🟥🟩🟦
    if (guildMember.user.bot) return;

    if (messageReaction.partial) {
        try {
			await messageReaction.fetch();
		} catch (error) {
			console.error('Impossible de récupérer les messages:', error);
			return;
		}
    }

    if (reactionEmoji.name === '🟥') message.delete();
    if (reactionEmoji.name === '🟦') message.reactions.removeAll();
    if (reactionEmoji.name === '🟩') message.channel.send('click sur carré vert : 🟩');

}