import { ActivityType } from 'discord.js';
import * as Logger from '../../utils/Logger.js';

export const name = 'ready';
export const once = true;
export async function execute(client) {
    let guildsCount = await client.guilds.fetch();
    let usersCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

    Logger.client(`- Prêt à être utilisé par ${usersCount} utilisateurs sur ${guildsCount.size} serveurs!`);

    client.user.setPresence({ activities: [{ name: 'le serveur d\'EsseB92', type: ActivityType.Listening }], status: 'idle' });

    // Instantané  différent de Global (dure environ 1h)
    const devGuild = await client.guilds.cache.get('1068467214027604019');
    devGuild.commands.set(client.commands.map(cmd => cmd));

    //client.application.commands.set([client.commands.map(cmd => cmd)]);
}