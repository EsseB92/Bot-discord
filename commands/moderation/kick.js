import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

export const name = 'kick';
export const category = 'moderation';
export const permissions = [PermissionFlagsBits.KickMembers];
export const ownerOnly = false;
export const usage = 'kick [@cible] [raison]';
export const examples = ['kick \`membre:\`@SB92270 \`raison:\`Spamming'];
export const description = 'Expluser(kick) un membre du serveur';
export const options = [
    {
        name: "cible",
        description: "Quel membre du serveur souhaitez-vous expulser?",
        type: ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "raison",
        description: "Pour quel motif devons-nous l'expulser?",
        type: ApplicationCommandOptionType.String,
        required: true,
    }
];
export async function runInteraction(client, interaction) {
    const target = interaction.options.getMember('cible');
    const reason = interaction.options.getString('raison');

    if(!target.kickable) return interaction.reply({ content: `Le membre ${target} ne peut pas être expulsé(kick) du serveur`, ephemeral: true });

    target.kick(reason);
    interaction.reply({ content: `Le membre ${target} a été expulsé(kick)`, ephemeral: true })
}