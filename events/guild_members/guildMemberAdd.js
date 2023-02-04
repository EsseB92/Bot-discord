import { EmbedBuilder } from 'discord.js';

export const name = 'guildMemberAdd';
export const once = false;
export async function execute(client, guildMember) {
    const fetchGuild = await client.getGuild(guildMember.guild); // BDD
    const memberLogsChannel = client.channels.cache.get(fetchGuild.memberLogsChannel.replace(new RegExp("[^(0-9)]", "g"), ''));

    const embed = new EmbedBuilder()
        .setAuthor({
            name: `${guildMember.user.username, guildMember.user.tag}`,
            iconURL: guildMember.user.displayAvatarURL(),
        })
        .setTitle('ARRIVÉE')
        .setColor('#00ff00')
        .addFields(
            { name: 'Lien', value: `${guildMember.user}` },
            { name: 'Id', value: `${guildMember.id}` },
            { name: 'Pseudo Discord', value: `${guildMember.user.username}` },
            { name: 'Créé le', value: `<t:${parseInt(guildMember.user.createdTimestamp / 1000)}:f> (<t:${parseInt(guildMember.user.createdTimestamp / 1000)}:R>)` },
            { name: 'Rejoint le', value: `<t:${parseInt(guildMember.joinedTimestamp / 1000)}:f> (<t:${parseInt(guildMember.joinedTimestamp / 1000)}:R>)` },
            { name: 'Nombre de membres', value: `${guildMember.guild.memberCount}`}
        )
        .setTimestamp()
        .setFooter({ text: "L'utilisateur a rejoint!" });

    
    memberLogsChannel.send({ embeds: [embed] });
}