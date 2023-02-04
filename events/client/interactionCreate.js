import { PermissionsBitField } from "discord.js";
const ownerId = process.env.OWNER_ID;

export const name = 'interactionCreate';
export const once = false;
export async function execute(client, baseInteraction) {

    let guildSettings = await client.getGuild(baseInteraction.guild); // BDD

    if (!guildSettings) {
        await client.createGuild(baseInteraction.guild);
        guildSettings = await client.getGuild(baseInteraction.guild); // BDD
        return baseInteraction.reply('Le bot a mis à jour la base de données pour votre serveur, retapez la commande!');
    }

    if (baseInteraction.isCommand() || baseInteraction.isContextMenuCommand()) {
        const cmd = client.commands.get(baseInteraction.commandName);
        if (!cmd)
            return baseInteraction.reply('Cette commande n\'existe pas!');

        if (cmd.ownerOnly) {
            if (baseInteraction.user.id != ownerId) 
                return baseInteraction.reply('La seule personne pouvant taper cette commande est le propriétaire du Bot!');
        }

        if (!baseInteraction.member.permissions.has([cmd.permissions]))
            return baseInteraction.reply({
                content: `Vous n'avez pas la/les permission(s) requise(s) (\`${new PermissionsBitField(cmd.permissions).toArray().join(', ')}\`) pour taper cette commande!`,
                ephemeral: true
            });

        cmd.runInteraction(client, baseInteraction, guildSettings);
    } else if (baseInteraction.isButton()) {
        const btn = client.buttons.get(baseInteraction.customId);
        if (!btn)
            return baseInteraction.reply('Ce bouton n\'existe pas!');
        btn.runInteraction(client, baseInteraction);
    } else if (baseInteraction.isStringSelectMenu()) {
        const selectMenu = client.selects.get(baseInteraction.customId);
        if (!selectMenu)
            return baseInteraction.reply('Ce selectMenu n\'existe pas!');
        selectMenu.runInteraction(client, baseInteraction);
    }
}