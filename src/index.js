const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ] 
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === '💬・𝐃𝐢𝐬𝐜𝐮𝐬𝐬𝐢𝐨𝐧');
    if (!channel) return;
    channel.send(`Bienvenue ${member} sur notre serveur!`);
});

client.on('message', msg => {
    if(msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(process.env.TOKEN);