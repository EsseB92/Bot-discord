const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ] 
});

client.on('guildMemberAdd', member => {
    // Replace "welcome" with the name of your welcome channel
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === '💬・𝐃𝐢𝐬𝐜𝐮𝐬𝐬𝐢𝐨𝐧');
    welcomeChannel.send(`Bienvenue ${member} sur notre serveur!`);
});

client.login(process.env.TOKEN);