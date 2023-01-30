import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

export const name = 'clear';
export const category = 'moderation';
export const permissions = [PermissionFlagsBits.ManageMessages];
export const ownerOnly = false;
export const usage = 'clear [nombre de messages] <@cible>';
export const examples = ['clear \`nombre de messages:\`50 \`cible:\`@SB92270', 'clear 50'];
export const description = 'Supprimer un nombre de message spécifié sur un salon (+ sur un utilisateur)';
export const options = [
    {
        name: "nombre_messages",
        description: "Combien de messages souhaitez-vous supprimer?",
        type: ApplicationCommandOptionType.Number,
        required: true,
    },
    {
        name: "cible",
        description: "À qui voulez-vous supprimer des messages?",
        type: ApplicationCommandOptionType.User,
        required: false,
    }
];
export async function runInteraction(client, interaction) {
    const amountToDelete = interaction.options.getNumber('nombre_messages');
    if (amountToDelete > 100 || amountToDelete < 0) return interaction.reply({ content: 'Le nombre de messages à supprimer doit être supérieur à 0 et inférieur à 100', ephemeral: true });
    const target = interaction.options.getMember('cible');

    const messagesToDelete = await interaction.channel.messages.fetch();
    if (target) {
        let i = 0;
        const filteredTargetMessages = [];
        (await messagesToDelete).filter(msg => {
            if (msg.author.id == target.id && amountToDelete > i) {
                filteredTargetMessages.push(msg);
                i++;
            }
        });

        await interaction.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
            interaction.reply({ content: `J'ai supprimé ${messages.size} messages de l'utilisateur ${target} sur ce salon`, ephemeral: true });
        })
    } else {
        await interaction.channel.bulkDelete(amountToDelete, true).then(messages => {
            interaction.reply({ content: `J'ai supprimé ${messages.size} messages sur ce salon`, ephemeral: true });
        })
    }
}