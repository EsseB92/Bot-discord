import { promisify } from 'util';
import glob from 'glob';
import { pathToFileURL } from 'url';
const pGlob = promisify(glob);
import * as Logger from '../Logger.js';

export default async (client) => {
    (await pGlob(`${process.cwd()}/events/*/*.js`)).map(async eventFile => {
        const event = import(pathToFileURL(eventFile).toString());
        
        event.then(promise => {
            if(!promise.name) return Logger.warn(`Evènement non déclenché: Il faut ajouter un nom à votre évènement\n                   Fichier -> ${eventFile}`);

            if(!eventList.includes(promise.name)) return Logger.typo(`Evènement non déclenché: Erreur de typo\n                   Fichier -> ${eventFile}`);
            
            

            if (promise.once) {
                client.once(promise.name, (...args) => promise.execute(client, ...args));
            } else {
                client.on(promise.name, (...args) => promise.execute(client, ...args));
            }
    
            Logger.event(`- ${promise.name}`);
        });

        // if(!eventList.includes(event.name) || !event.name) {
        //     return console.log(`----------\nEvènement non chargé: erreur de typo (ou pas de nom)\nFichier -> ${eventFile}\n----------`);
        // }

        // if (event.once) {
        //     client.once(event.name, (...args) => event.execute(client, ...args));
        // } else {
        //     client.on(event.name, (...args) => event.execute(client, ...args));
        // }

        // console.log(`Evènement chargé: ${event.name}`);
    })
}

const eventList = ['applicationCommandPermissionsUpdate', 'autoModerationActionExecution', 'autoModerationRuleCreate', 'autoModerationRuleDelete', 'autoModerationRuleUpdate', 'channelCreate', 'channelDelete', 'channelPinsUpdate', 'channelUpdate', 'debug', 'emojiCreate', 'emojiDelete', 'emojiUpdate', 'error', 'guildBanAdd', 'guildBanRemove', 'guildCreate', 'guildDelete', 'guildIntegrationsUpdate', 'guildMemberAdd', 'guildMemberAvailable', 'guildMemberRemove', 'guildMembersChunk', 'guildMemberUpdate', 'guildScheduledEventCreate', 'guildScheduledEventDelete', 'guildScheduledEventUpdate', 'guildScheduledEventUserAdd', 'guildScheduledEventUserRemove', 'guildUnavailable', 'guildUpdate', 'interactionCreate', 'invalidated', 'inviteCreate', 'inviteDelete', 'messageCreate', 'messageDelete', 'messageDeleteBulk', 'messageReactionAdd', 'messageReactionRemove', 'messageReactionRemoveAll', 'messageReactionRemoveEmoji', 'messageUpdate', 'presenceUpdate', 'ready', 'roleCreate', 'roleDelete', 'roleUpdate', 'shardDisconnect', 'shardError', 'shardReady', 'shardReconnecting', 'shardResume', 'stageInstanceCreate', 'stageInstanceDelete', 'stageInstanceUpdate', 'stickerCreate', 'stickerDelete', 'stickerUpdate', 'threadCreate', 'threadDelete', 'threadListSync', 'threadMembersUpdate', 'threadMemberUpdate', 'threadUpdate', 'typingStart', 'userUpdate', 'voiceStateUpdate', 'warn', 'webhookUpdate'];