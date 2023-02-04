// import { AuditLogEvent, EmbedBuilder } from 'discord.js';

// export const name = 'guildBanAdd';
// export const once = false;
// export async function execute(client, guildBan) {
//     const fetchGuild = await client.getGuild(guildBan.guild); // BDD
//     const moderationLogsChannel = client.channels.cache.get(fetchGuild.moderationLogsChannel.replace(new RegExp("[^(0-9)]", "g"), ''));

//     const guildMember = guildBan.guild.members.cache.filter(member => (member.id === guildBan.user.id)).first();

//     //console.log(guildMember.user.username)

//     const embedModeration = new EmbedBuilder()
//         .setAuthor({
//             name:  `${guildMember.user.username, guildMember.user.tag}`,
//             iconURL: guildMember.user.displayAvatarURL(),
//         })
//         .setTitle('BANNISSEMENT (BAN)')
//         .setColor('#ff0000')
//         .addFields(
//             { name: 'Lien', value: `${guildMember.user}` },
//             { name: 'Id', value: `${guildMember.id}` },
//             { name: 'Pseudo Discord', value: `${guildMember.user.username}` },
//             { name: 'Pseudo sur le serveur', value: `${guildMember.displayName}` },
//             { name: 'Créé le', value: `<t:${parseInt(guildMember.user.createdTimestamp / 1000)}:f> (<t:${parseInt(guildMember.user.createdTimestamp / 1000)}:R>)` },
//             { name: 'Rejoint le', value: `<t:${parseInt(guildMember.joinedTimestamp / 1000)}:f> (<t:${parseInt(guildMember.joinedTimestamp / 1000)}:R>)` },
//             { name: 'Ban le', value: `<t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)`},
//             { name: 'Raison', value: guildBan.reason}
//         )
//         .setTimestamp()
//         .setFooter({ text: "L'utilisateur a été ban!" });

//         console.log("??????????????????")

//         moderationLogsChannel.send({ embeds: [embedModeration] });
// }