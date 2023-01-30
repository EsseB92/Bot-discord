import { EmbedBuilder, PermissionFlagsBits, ApplicationCommandOptionType } from 'discord.js';

export const name = 'poll';
export const category = 'utils';
export const permissions = [PermissionFlagsBits.SendMessages];
export const ownerOnly = false;
export const usage = 'poll [titre] [contenu]';
export const examples = ['poll \`titre:\`Heure \`contenu:\`Quelle heure est-il?'];
export const description = 'Poster votre propre sondage';
export const options = [
    {
        name: 'titre',
        description: 'Quel est le titre de votre sondage?',
        type: ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: 'contenu',
        description: 'Quel est le contenu de votre sondage?',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
];
export async function runInteraction(client, interaction) {
    const pollTitle = interaction.options.getString('titre');
    const pollContent = interaction.options.getString('contenu');

    const embed = new EmbedBuilder()
        .setTitle(pollTitle)
        .setColor('#1528ff')
        .setDescription(pollContent)
        .setTimestamp()
        .setFooter({ text: `Nouveau sondage généré par ${interaction.user.tag}!` });

    const poll = await interaction.reply({ embeds: [embed], fetchReply: true });
    poll.react('✅');
    poll.react('❌');
}