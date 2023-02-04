export const name = 'guildCreate';
export const once = false;
export async function execute(client, guild) {
    await client.createGuild(guild); // BDD
}