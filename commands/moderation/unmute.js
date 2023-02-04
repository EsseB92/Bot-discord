import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";


/* MUTE = TIMEOUT */
export const name = 'unmute';
export const category = 'moderation';
export const permissions = [PermissionFlagsBits.ModerateMembers];
export const ownerOnly = false;
export const usage = 'unmute [@cible]';
export const examples = ['unmute @SB92270'];
export const description = "Réinclure(unmute) un membre du serveur";
export const options = [
    {
        name: "cible",
        description: "Quel membre du serveur souhaitez-vous réinclure(unmute)?",
        type: ApplicationCommandOptionType.User,
        required: true,
    }
];
export async function runInteraction(client, interaction) {
    const target = interaction.options.getMember('cible');

    if(!target.isCommunicationDisabled()) return interaction.reply({ content: `Le membre ${target} ne peut pas réinclure(unmute) le serveur`, ephemeral: true });

    target.timeout(null);
    interaction.reply({ content: `Le membre ${target} a été réinclu(unmute) au serveur!`, ephemeral: true })
}