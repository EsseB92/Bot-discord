export const name = 'accept-button';
export async function runInteraction(client, interaction) {
    await interaction.member.roles.add('1070031952662495262');
    await interaction.reply({ content: 'Vous avez accepté les règles! Vous pouvez désormais accéder au serveur', ephemeral: true });
};