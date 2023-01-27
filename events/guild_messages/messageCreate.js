const prefix = '!';

module.exports =  {
    name: 'messageCreate',
    once: false,
    execute(client, message) {
        if (message.author.bot) {
            console.log(`Message envoyé par le bot: ${message}`);
            return;
        } 
        if (!message.content.startsWith(prefix)) {
            console.log(`Le message ne contient pas le prefix(${prefix}): ${message}`);
            return;
        }

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        console.log(`Arguments: ${args}`);
        const cmdName = args.shift().toLowerCase();
        console.log(`Commandes: ${cmdName}`);
        
        if (cmdName.length == 0) {
            console.log(`Aucune commande existante`);
            return;
        }
        
        
        let cmd = client.commands.get(cmdName);
        console.log(`cmd: ${cmd}`);
        if(cmd) cmd.run(client, message, args);
    }
}