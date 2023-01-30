import { promisify } from 'util';
import glob from 'glob';
import { PermissionsBitField, ApplicationCommandPermissionType } from 'discord.js';
const pGlob = promisify(glob);
import * as Logger from '../Logger.js';
import { pathToFileURL } from 'url';

export default async (client) => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async cmdFile => {
        const cmd = import(pathToFileURL(cmdFile).toString());


        cmd.then(promise => {
            if(!promise.name) return Logger.warn(`Commande non chargée: Il faut ajouter un nom à votre commande\n                   Fichier -> ${cmdFile}`);

            if(!promise.description && promise.type != ApplicationCommandPermissionType.User) return Logger.warn(`Commande non chargée: Il faut ajouter une description à votre commande\n                   Fichier -> ${cmdFile}`);

            if(!promise.category) return Logger.warn(`Commande non chargée: Il faut ajouter une catégorie à votre commande\n                   Fichier -> ${cmdFile}`);

            if(!promise.permissions) return Logger.warn(`Commande non chargée: Il faut ajouter une/des permissions à votre commande\n                   Fichier -> ${cmdFile}`);

            new PermissionsBitField(promise.permissions).toArray().forEach(permission => {
                if(!permissionList.includes(permission)) {
                    return Logger.typo(`Commande non chargée: erreur de typo sur la permission ${permission}\n                   Fichier -> ${cmdFile}`);
                }
            });

            client.commands.set(promise.name, promise);
            Logger.command(`- ${promise.name}`);
        });
        
        // if(!cmd.name || (!cmd.description && cmd.type != ApplicationCommandPermissionType.User)) return error(`----------\nCommande non chargée: pas de nom et/ou de description\nFichier -> ${cmdFile}\n----------`);

        // if(!cmd.category) return console.log(`----------\nCommande non chargée: pas de catégorie\nFichier -> ${cmdFile}\n----------`);

        // if(!cmd.permissions) return console.log(`----------\nCommande non chargée: pas de permission\nFichier -> ${cmdFile}\n----------`);

        // new PermissionsBitField(cmd.permissions).toArray().forEach(permission => {
        //     if(!permissionList.includes(permission)) {
        //         return console.log(`----------\nCommande non chargé: erreur de typo sur la permission ${permission}\nFichier -> ${cmdFile}\n----------`);
        //     }
        // });

        // client.commands.set(cmd.name, cmd);
        // console.log(`Commande chargée: ${cmd.name}`);
    });
};

const permissionList = new PermissionsBitField(PermissionsBitField.All).toArray();