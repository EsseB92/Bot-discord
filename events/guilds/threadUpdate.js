export const name = 'threadUpdate';
export const once = false;
export async function execute(client, oldThreadChannel, newThreadChannel) {
    if (oldThreadChannel.archived && !newThreadChannel.archived)
        newThreadChannel.join();
    // const logChannel = client.channels.cache.get('1068560374711980032');
    // logChannel.send(`Nom du thread: ${thread.name}!`);
}