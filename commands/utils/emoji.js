import { PermissionFlagsBits, ApplicationCommandOptionType } from 'discord.js';

export const name = 'emoji';
export const category = 'utils';
export const permissions = [PermissionFlagsBits.SendMessages];
export const ownerOnly = false;
export const usage = 'emoji';
export const examples = ['emoji'];
export const description = 'Poster vos émojis';
export async function runInteraction(client, interaction) {

    

    const poll = await interaction.reply({ content: 'Emoji', fetchReply: true });
    await poll.react('🟥');
    await poll.react('🟩');
    await poll.react('🟦');
}