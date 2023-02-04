import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

export const name = 'slowmode';
export const category = 'moderation';
export const permissions = [PermissionFlagsBits.ManageMessages];
export const ownerOnly = false;
export const usage = 'slowmode [délai par personne]';
export const examples = ['slowmode 15'];
export const description = 'Ajouter un slowmode(ratelimit) sur le salon';
export const options = [
    {
        name: "délai",
        description: "Quel est le délai entre chaque message?",
        type: ApplicationCommandOptionType.Number,
        required: true,
    },
];
export async function runInteraction(client, interaction) {
    const value = interaction.options.getNumber('délai');
    
    if (value == 0) {
        await interaction.channel.setRateLimitPerUser(0)
        return interaction.reply({ content: "Le slowmode est désactivé!", ephemeral: true});
    } else {
        await interaction.channel.setRateLimitPerUser(value)
        return interaction.reply({ content: `Le slowmode est défini à \`${value}\` secondes de délai`, ephemeral: true});

    }
}