import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

export const name = 'unlock';
export const category = 'moderation';
export const permissions = [PermissionFlagsBits.ManageChannels];
export const ownerOnly = false;
export const usage = 'unlock';
export const examples = ['unlock'];
export const description = 'Déverrouiller(unlock) un salon';
export async function runInteraction(client, interaction) {
    await interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
        SendMessages: true
      })
        .then(channel => {
            interaction.reply({ content: `Le salon ${channel} est déverrouillé`, ephemeral: true });
        })
        .catch(console.error);
}