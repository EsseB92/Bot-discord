module.exports =  {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Le bot est prêt');

        // Instantané  différent de Global (dure environ 1h)
        const devGuild = await client.guilds.cache.get('1068467214027604019');
        devGuild.commands.set(client.commands.map(cmd => cmd));
    }
}