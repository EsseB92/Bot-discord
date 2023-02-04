export const name = 'primary-button';
export async function runInteraction(client, interaction) {
    await interaction.reply({ content: "Je suis le bouton primary!" });
}