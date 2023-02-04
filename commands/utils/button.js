import { ActionRowBuilder, ButtonBuilder, PermissionFlagsBits, ButtonStyle } from 'discord.js';

const buttons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('primary-button')
            .setLabel('Primary')
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId('secondary-button')
            .setLabel('Secondary')
            .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
            .setCustomId('success-button')
            .setLabel('Success')
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId('danger-button')
            .setLabel('Danger')
            .setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
            .setURL('https://google.com')
            .setLabel('Link')
            .setStyle(ButtonStyle.Link),
    )



export const name = 'button';
export const category = 'utils';
export const permissions = [PermissionFlagsBits.SendMessages];
export const ownerOnly = false;
export const usage = 'button';
export const examples = ['button'];
export const description = "button";
export async function runInteraction(client, interaction) {
    await interaction.reply({ content: 'Cliquer sur les boutons', components: [buttons]});
}