import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

export const name = 'lock';
export const category = 'moderation';
export const permissions = [PermissionFlagsBits.ManageChannels];
export const ownerOnly = false;
export const usage = 'lock';
export const examples = ['lock'];
export const description = 'Verrouiller(lock) un salon';
export async function runInteraction(client, interaction) {
    await interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
        SendMessages: false
      })
        .then(channel => {
            interaction.reply({ content: `Le salon ${channel} est verrouillé`, ephemeral: true });
        })
        .catch(console.error);
}