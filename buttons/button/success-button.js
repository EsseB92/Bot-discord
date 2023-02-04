export const name = 'success-button';
export async function runInteraction(client, interaction) {
    await interaction.reply({ content: "Je suis le bouton success!" });
}