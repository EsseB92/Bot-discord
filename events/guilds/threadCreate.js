export const name = 'threadCreate';
export const once = false;
export async function execute(client, threadChannel) {
    const fetchGuild = await client.getGuild(guildMember.guild);

    if (threadChannel.isTextBased()) 
        threadChannel.join();
        
    const logChannel = client.channels.cache.get(fetchGuild.logChannel.replace(new RegExp("[^(0-9)]", "g"), ''));
    logChannel.send(`Nom du thread: ${threadChannel.name}!`);
}