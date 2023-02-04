export const name = 'refuse-button';
export async function runInteraction(client, interaction) {
    try {
        await interaction.member.send(`Tu n'as pas accepté les règles du serveur ${interaction.guild.name}!\nTu as été kick!`);
    } catch (e){
        await interaction.reply(`Le membre ${interaction.member.displayName} n'a pas accepté les règles, je l'ai expulsé(kick)!`);
    }

    await interaction.member.kick("Il n'a pas accépté les règles!");
}