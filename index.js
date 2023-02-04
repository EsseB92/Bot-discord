import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js';
import { config } from 'dotenv'; config();
import * as mongoose from 'mongoose';
import CommandUtil from './utils/handlers/CommandUtil.js';
import EventUtil from './utils/handlers/EventUtil.js';
import ButtonUtil from './utils/handlers/ButtonUtil.js';
import SelectUtil from './utils/handlers/SelectUtil.js';
import Functions from './utils/Functions.js'
import * as Logger from './utils/Logger.js';
const client = new Client({
    intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.User
    ]
});

// client.commands = new Collection();
// client.buttons = new Collection();
['commands', 'buttons', 'selects'].forEach(collection => client[collection] = new Collection());

[CommandUtil, EventUtil, ButtonUtil, SelectUtil, Functions].forEach(util => { util(client) });

process.on('exit', code => { Logger.client(`Le processus s'est arrêté avec le code: ${code}!`) });
process.on('uncaughtException', (err, origin) => { 
    Logger.error(`UNCAUGHT_EXCEPTION: ${err}`);
    console.error(`Origine: ${origin}`);
});
process.on('unhandledRejection', (reason, promise) => {
    Logger.warn(`UNHANDLED_REJECTION: ${reason}`);
    console.log(promise);
});
process.on('warning', (...args) => Logger.warn(...args));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).then(() => { Logger.client('- Connecté à la base de données'); })
.catch(err => { Logger.error(err); });

client.login(process.env.TOKEN);