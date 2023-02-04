export const name = 'roles-menu';
export async function runInteraction(client, interaction) {
    await interaction.member.roles.add(interaction.values);
    await interaction.reply({ content: 'Félicitation, le bot vous a rajouté votre rôle', ephemeral: true });
};