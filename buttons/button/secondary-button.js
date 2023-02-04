export const name = 'secondary-button';
export async function runInteraction(client, interaction) {
    await interaction.reply({ content: "Je suis le bouton secondary!" });
}