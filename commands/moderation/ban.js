import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

export const name = 'ban';
export const category = 'moderation';
export const permissions = [PermissionFlagsBits.BanMembers];
export const ownerOnly = false;
export const usage = 'ban [@cible] [raison]';
export const examples = ['ban \`membre:\`@SB92270 \`raison:\`Spamming'];
export const description = 'Bannir(ban) un membre du serveur';
export const options = [
    {
        name: "membre",
        description: "Quel membre du serveur souhaitez-vous bannir?",
        type: ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "raison",
        description: "Pour quel motif devons-nous le bannir?",
        type: ApplicationCommandOptionType.String,
        required: true,
    }
];
export async function runInteraction(client, interaction) {
    const target = interaction.options.getMember('membre');
    const reason = interaction.options.getString('raison');

    //console.log(target);

    if(!target.bannable) return interaction.reply({ content: `Le membre ${target} ne peut pas être banni(ban) du serveur`, ephemeral: true });

    target.ban({ deleteMessageSeconds: 60 * 60 * 24 * 7, reason : reason });
         
    interaction.reply({ content: `Le membre ${target} a été banni(ban)`, ephemeral: true });
}