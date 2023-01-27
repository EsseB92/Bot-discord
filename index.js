const { Client, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

client.commands = new Collection();

['CommandUtil', 'EventUtil'].forEach(handler => { require(`./utils/handlers/${handler}`) });

client.login(process.env.TOKEN);