import * as Logger from '../../utils/Logger.js';

export const name = 'ready';
export const once = true;
export async function execute(client) {
    Logger.client('- Prêt à être utilisé');

    // Instantané  différent de Global (dure environ 1h)
    const devGuild = await client.guilds.cache.get('1068467214027604019');
    devGuild.commands.set(client.commands.map(cmd => cmd));
}