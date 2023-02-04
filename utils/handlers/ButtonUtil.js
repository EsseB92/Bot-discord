import { promisify } from 'util';
import glob from 'glob';
import { PermissionsBitField, ApplicationCommandPermissionType } from 'discord.js';
const pGlob = promisify(glob);
import * as Logger from '../Logger.js';
import { pathToFileURL } from 'url';

export default async (client) => {
    (await pGlob(`${process.cwd()}/buttons/*/*.js`)).map(async btnFile => {

        const btn = import(pathToFileURL(btnFile).toString());
        btn.then(promise => {

            if(!promise.name) return Logger.warn(`Bouton non chargée: Il faut ajouter un nom à votre bouton\n                   Fichier -> ${btnFile}`);
            client.buttons.set(promise.name, promise);
        });
    });
};