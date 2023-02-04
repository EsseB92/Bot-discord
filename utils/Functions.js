import Guild from '../models/guild.js';

export default client => {
    client.getGuild = async guild => {
        const guildData = await Guild.findOne({ id: guild.id });
        return guildData;
    };

    client.createGuild = async guild => {
        const createGuild = new Guild({ id: guild.id });
        createGuild.save().then(g => console.log(`Nouveau serveur (${g.id})`));
    }

    client.updateGuild = async (guild, settings) => {
        let guildData = await client.getGuild(guild); // BDD
        if (typeof guildData != 'object')
            guildData = {};
        for (const key in settings) {
            if (guildData[key] != settings[key])
                guildData[key] = settings[key];
        }
        return guildData.updateOne(settings);
    }
}