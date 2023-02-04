import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

export const name = 'reload';
export const category = 'admin';
export const permissions = [PermissionFlagsBits.Administrator];
export const ownerOnly = true;
export const usage = 'reload';
export const examples = ['reload'];
export const description = 'Relancer le bot';
export async function runInteraction(client, interaction) {
    // const devGuild = await client.guilds.cache.get('1068467214027604019');
    // devGuild.commands.set([]);
    await interaction.reply('Bot relancé!');
    return process.exit();
}