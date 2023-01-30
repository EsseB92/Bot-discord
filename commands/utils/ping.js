import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export const name = 'ping';
export const category = 'utils';
export const permissions = [PermissionFlagsBits.Administrator, PermissionFlagsBits.KickMembers];
export const description = 'Commande ping!';
export async function runInteraction(client, interaction) {
    const tryPong = await interaction.reply({ content: "On essaye de pong ... un instant!", fetchReply: true });

    const embed = new EmbedBuilder()
        .setTitle('🏓 Pong!')
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            {
                name: 'Latence API',
                value: `\`\`\`${client.ws.ping}ms\`\`\``,
                inline: true
            },
            {
                name: 'Latence BOT',
                value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``,
                inline: true
            }
        )
        .setTimestamp()
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });


    interaction.editReply({ content: '', embeds: [embed] });
}