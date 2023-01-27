const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ] 
});

client.once('ready', () => {
    console.log(`Je suis prêt`);
});

client.login(process.env.TOKEN);