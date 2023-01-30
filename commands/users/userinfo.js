import { EmbedBuilder, PermissionFlagsBits, ApplicationCommandPermissionType } from 'discord.js';

export const name = 'userinfo';
export const category = 'users';
export const permissions = [PermissionFlagsBits.Administrator];
export const type = ApplicationCommandPermissionType.User;
export async function runInteraction(client, interaction) {
    const member = await interaction.guild.members.fetch(interaction.targetId);

    const embed = new EmbedBuilder()
        .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f916.png' : 'https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f9d1.png' })
        .setColor('#8A2BE2')
        .setImage(member.user.displayAvatarURL())
        .addFields(
            { name: 'Nom', value: `${member.displayName}`, inline: true },
            { name: 'Modérateur', value: `${member.kickable ? '🔴' : '🟢'}`, inline: true },
            { name: 'Bot', value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true },
            { name: 'Roles', value: `${member.roles.cache.map(role => role).join(', ').replace(', @everyone', '')}` },
            {
                name: 'A crée son compte le',
                value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`
            },
            {
                name: 'A rejoint le serveur le',
                value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`
            }
        );

    interaction.reply({ embeds: [embed], ephemeral: true });
}