import { EmbedBuilder, PermissionFlagsBits, ApplicationCommandOptionType } from 'discord.js';

export const name = 'poll';
export const category = 'utils';
export const permissions = [PermissionFlagsBits.Administrator];
export const description = 'Poster votre propre sondage!';
export const options = [
    {
        name: 'title',
        description: 'Taper le titre de votre sondage',
        type: ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: 'content',
        description: 'Taper la question de votre sondage',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
];
export async function runInteraction(client, interaction) {
    const pollTitle = interaction.options.getString('title');
    const pollContent = interaction.options.getString('content');

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