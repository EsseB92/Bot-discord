const { PermissionsBitField } = require("discord.js");


module.exports =  {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd) return interaction.reply('Cette commande n\'existe pas!');

            if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({ content: `Vous n'avez pas la/les permission(s) requise(s) (\`${new PermissionsBitField(cmd.permissions).toArray().join(', ')}\`) pour taper cette commande!`, ephemeral: true });

            cmd.runInteraction(client, interaction);
        }
    }
}