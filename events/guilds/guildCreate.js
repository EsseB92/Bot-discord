import { Guild } from '../../models/index.js';
import * as Logger from '../../utils/Logger.js';

export const name = 'guildCreate';
export const once = false;
export async function execute(client, guild) {
    const createGuild = await new Guild({ id: guild.id });
    createGuild.save().then(g => Logger.client(`Nouveau serveur (${g.id})`));
}