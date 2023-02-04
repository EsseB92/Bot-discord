import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import Guild from '../../models/guild.js'

export const name = 'update';
export const category = 'admin';
export const permissions = [PermissionFlagsBits.Administrator];
export const ownerOnly = true;
export const usage = 'update';
export const examples = ['update'];
export const description = 'Mettre à jour les nouvelles données!';
export async function runInteraction(client, interaction) {
    await Guild.updateMany({}, { "$set": { "testChannel": "1070033647593340939" }, upsert: true });
    interaction.reply('Nouvelles données ajoutées!');
}