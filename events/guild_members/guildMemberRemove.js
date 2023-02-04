import { AuditLogEvent, EmbedBuilder } from 'discord.js';

export const name = 'guildMemberRemove';
export const once = false;
export async function execute(client, guildMember) {
    const fetchGuild = await client.getGuild(guildMember.guild); // BDD
    const moderationLogsChannel = client.channels.cache.get(fetchGuild.moderationLogsChannel.replace(new RegExp("[^(0-9)]", "g"), ''));
    const memberLogsChannel = client.channels.cache.get(fetchGuild.memberLogsChannel.replace(new RegExp("[^(0-9)]", "g"), ''));

    let embedModeration;
    let isMemberKick = false;
    let isMemberBan = false;

    if (guildMember.guild.bans.cache.has(guildMember.id)) {
        isMemberBan = true;
        const guildAuditLogsBan = await guildMember.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberBanAdd });
        const guildAuditLogsEntryBan = guildAuditLogsBan.entries.first();

        embedModeration = new EmbedBuilder()
        .setAuthor({
            name:  `${guildMember.user.username, guildMember.user.tag}`,
            iconURL: guildMember.user.displayAvatarURL(),
        })
        .setTitle('BANNISSEMENT (BAN)')
        .setColor('#ff0000')
        .addFields(
            { name: 'Lien', value: `${guildMember.user}` },
            { name: 'Id', value: `${guildMember.id}` },
            { name: 'Pseudo Discord', value: `${guildMember.user.username}` },
            { name: 'Pseudo sur le serveur', value: `${guildMember.displayName}` },
            { name: 'Créé le', value: `<t:${parseInt(guildMember.user.createdTimestamp / 1000)}:f> (<t:${parseInt(guildMember.user.createdTimestamp / 1000)}:R>)` },
            { name: 'Rejoint le', value: `<t:${parseInt(guildMember.joinedTimestamp / 1000)}:f> (<t:${parseInt(guildMember.joinedTimestamp / 1000)}:R>)` },
            { name: 'Ban le', value: `<t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)`},
            { name: 'Raison', value: guildAuditLogsEntryBan.reason}
        )
        .setTimestamp()
        .setFooter({ text: "L'utilisateur a été ban!" });
    } else {
        isMemberKick = true;
        const guildAuditLogsKick = await guildMember.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberKick });
        const guildAuditLogsEntryKick = guildAuditLogsKick.entries.first();

        embedModeration = new EmbedBuilder()
        .setAuthor({
            name:  `${guildMember.user.username, guildMember.user.tag}`,
            iconURL: guildMember.user.displayAvatarURL(),
        })
        .setTitle('EXPULSION (kick)')
        .setColor('#ff0000')
        .addFields(
            { name: 'Lien', value: `${guildMember.user}` },
            { name: 'Id', value: `${guildMember.id}` },
            { name: 'Pseudo Discord', value: `${guildMember.user.username}` },
            { name: 'Pseudo sur le serveur', value: `${guildMember.displayName}` },
            { name: 'Créé le', value: `<t:${parseInt(guildMember.user.createdTimestamp / 1000)}:f> (<t:${parseInt(guildMember.user.createdTimestamp / 1000)}:R>)` },
            { name: 'Rejoint le', value: `<t:${parseInt(guildMember.joinedTimestamp / 1000)}:f> (<t:${parseInt(guildMember.joinedTimestamp / 1000)}:R>)` },
            { name: 'Kick le', value: `<t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)`},
            { name: 'Raison', value: guildAuditLogsEntryKick.reason}
        )
        .setTimestamp()
        .setFooter({ text: "L'utilisateur a été kick!" });
    }

    const textModeration = `Kick: ${isMemberKick ? '🟢' : '🔴'}\nBan: ${isMemberBan ? '🟢' : '🔴'}`
    console.log(textModeration);

    const embedMember = new EmbedBuilder()
        .setAuthor({
            name: `${guildMember.user.username, guildMember.user.tag}`,
            iconURL: guildMember.user.displayAvatarURL(),
        })
        .setTitle('DÉPART')
        .setColor('#ff0550')
        .addFields(
            { name: 'Lien', value: `${guildMember.user}` },
            { name: 'Id', value: `${guildMember.id}` },
            { name: 'Pseudo Discord', value: `${guildMember.user.username}` },
            { name: 'Pseudo sur le serveur', value: `${guildMember.displayName}` },
            { name: 'Créé le', value: `<t:${parseInt(guildMember.user.createdTimestamp / 1000)}:f> (<t:${parseInt(guildMember.user.createdTimestamp / 1000)}:R>)` },
            { name: 'Rejoint le', value: `<t:${parseInt(guildMember.joinedTimestamp / 1000)}:f> (<t:${parseInt(guildMember.joinedTimestamp / 1000)}:R>)` },
            { name: 'Quitté le', value: `<t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)`},
            { name: 'Modération', value: textModeration }
        )
        .setTimestamp()
        .setFooter({ text: "L'utilisateur a quitté!" });


    
    
    memberLogsChannel.send({ embeds: [embedMember] });
    moderationLogsChannel.send({ embeds: [embedModeration] });
}