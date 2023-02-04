import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

const buttons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('accept-button')
            .setLabel('Accepter')
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId('refuse-button')
            .setLabel('Refuser')
            .setStyle(ButtonStyle.Danger),
    );

const welcomeEmbed = new EmbedBuilder()
    .setTitle('Charte du serveur')
    .setDescription('Règles ...')
    .setFooter({ text: 'Bienvenue sur le serveur' })
    .setTimestamp();


export const name = 'welcome';
export const category = 'utils';
export const permissions = [PermissionFlagsBits.SendMessages];
export const ownerOnly = false;
export const usage = 'welcome';
export const examples = ['welcome'];
export const description = "Permet d'envoyer l'embed des règles";
export async function runInteraction(client, interaction) {
    await interaction.reply({ embeds: [welcomeEmbed], components: [buttons] });
}