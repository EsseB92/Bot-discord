const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

require('./utils/handlers/EventUtil')(client);

client.login(process.env.TOKEN);