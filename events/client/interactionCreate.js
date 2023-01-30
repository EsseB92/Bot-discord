import { PermissionsBitField } from "discord.js";
const ownerId = process.env.OWNER_ID;

export const name = 'interactionCreate';
export const once = false;
export async function execute(client, interaction) {
    if (interaction.isCommand() || interaction.isContextMenu()) {
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd)
            return interaction.reply('Cette commande n\'existe pas!');

        if (cmd.ownerOnly) {
            if (interaction.user.id != ownerId) 
                return interaction.reply('La seule personne pouvant taper cette commande est le propriétaire du Bot!');
        }

        if (!interaction.member.permissions.has([cmd.permissions]))
            return interaction.reply({
                content: `Vous n'avez pas la/les permission(s) requise(s) (\`${new PermissionsBitField(cmd.permissions).toArray().join(', ')}\`) pour taper cette commande!`,
                ephemeral: true
            });

        cmd.runInteraction(client, interaction);
    }
}