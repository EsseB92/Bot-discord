import { promisify } from 'util';
import glob from 'glob';
import { PermissionsBitField, ApplicationCommandPermissionType } from 'discord.js';
const pGlob = promisify(glob);
import * as Logger from '../Logger.js';
import { pathToFileURL } from 'url';

export default async (client) => {
    (await pGlob(`${process.cwd()}/selects/*/*.js`)).map(async selectMenuFile => {

        const selectMenu = import(pathToFileURL(selectMenuFile).toString());
        selectMenu.then(promise => {

            if(!promise.name) return Logger.warn(`SelectMenu non chargée: Il faut ajouter un nom à votre menu\n                   Fichier -> ${selectMenuFile}`);
            client.selects.set(promise.name, promise);
        });
    });
};