import { ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits } from 'discord.js';

const selectMenu = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('roles-menu')
            .setPlaceholder('Choisir un rôle dans la liste')
            .setMinValues(1)
            .setMaxValues(3)
            .addOptions([
                {
                    label: 'Vert',
                    value: '1070127825492910242',
                    description: 'Choisir la couleur verte'
                },
                {
                    label: 'Rouge',
                    value: '1070127870195802193',
                    description: 'Choisir la couleur rouge'
                },
                {
                    label: 'Orange',
                    value: '1070127959417032805',
                    description: 'Choisir la couleur orange'
                }
            ])
    )



export const name = 'roles';
export const category = 'utils';
export const permissions = [PermissionFlagsBits.SendMessages];
export const ownerOnly = false;
export const usage = 'roles';
export const examples = ['roles'];
export const description = "roles";
export async function runInteraction(client, interaction) {
    await interaction.reply({ content: 'Choisir un ou plusieurs rôles', components: [selectMenu]});
}