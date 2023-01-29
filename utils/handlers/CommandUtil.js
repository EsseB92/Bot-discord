const { promisify } = require('util');
const { glob } = require('glob');
const { PermissionsBitField, ApplicationCommandPermissionType } = require('discord.js');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async cmdFile => {
        const cmd = require(cmdFile);
        
        // 2 => 'USER'
        if(!cmd.name || (!cmd.description && cmd.type != ApplicationCommandPermissionType.User)) return console.log(`----------\nCommande non chargée: pas de nom et/ou de description\nFichier -> ${cmdFile}\n----------`);

        if(!cmd.permissions) return console.log(`----------\nCommande non chargée: pas de permission\nFichier -> ${cmdFile}\n----------`);

        new PermissionsBitField(cmd.permissions).toArray().forEach(permission => {
            if(!permissionList.includes(permission)) {
                return console.log(`----------\nCommande non chargé: erreur de typo sur la permission ${permission}\nFichier -> ${cmdFile}\n----------`);
            }
        });

        client.commands.set(cmd.name, cmd);
        console.log(`Commande chargée: ${cmd.name}`);
    });
};

const permissionList = new PermissionsBitField(PermissionsBitField.All).toArray();