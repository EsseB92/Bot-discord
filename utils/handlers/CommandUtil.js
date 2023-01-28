const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async cmdFile => {
        const cmd = require(cmdFile);
        
        // 2 => 'USER'
        if(!cmd.name || (!cmd.description && cmd.type != 2)) return console.log(`----------\nCommande non chargée: pas de nom et/ou de description\nFichier -> ${cmdFile}\n----------`);

        client.commands.set(cmd.name, cmd);
        console.log(`Commande chargée: ${cmd.name}`);
    })
}