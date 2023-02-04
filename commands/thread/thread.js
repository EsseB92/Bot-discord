import { ApplicationCommandOptionType, PermissionFlagsBits, ChannelType } from "discord.js";

export const name = 'thread';
export const category = 'thread';
export const permissions = [PermissionFlagsBits.ManageThreads];
export const ownerOnly = false;
export const usage = 'thread [join|leave|archive|unarchive|delete]';
export const examples = ['thread join', 'thread leave'];
export const description = 'Commandes concernant les threads';
export const options = [
    {
        name: "join",
        description: "Joindre un thread",
        type: ApplicationCommandOptionType.Subcommand,
    },
    {
        name: "leave",
        description: "Quitter un thread",
        type: ApplicationCommandOptionType.Subcommand,
    },
    {
        name: "archive",
        description: "Archiver un thread",
        type: ApplicationCommandOptionType.Subcommand,
    },
    {
        name: "unarchive",
        description: "Désarchiver un thread",
        type: ApplicationCommandOptionType.Subcommand,
    },
    {
        name: "delete",
        description: "Supprimer un thread",
        type: ApplicationCommandOptionType.Subcommand,
        options: [ { name: 'channel', type: ApplicationCommandOptionType.String, description: 'Id du channel', required: true} ]
    },
];
export async function runInteraction(client, interaction) {
    let thread = interaction.channel;
    if ((!thread.isThread())) 
        return interaction.reply({ content: "Impossible de taper cette commande car vous n'êtes pas dans un thread", ephemeral: true });

    if(interaction.options.getSubcommand() === 'join') {
        
        if (thread.joinable) {
            interaction.reply('Le bot a rejoint le thread');
            await thread.join();
        } else {
            interaction.reply('Le bot a déjà rejoint le thread');
        }
    } else if(interaction.options.getSubcommand() === 'leave') {
        interaction.reply('Le bot a quitté le thread');
        await thread.leave();
    } else if(interaction.options.getSubcommand() === 'archive') {
        await interaction.reply('Le bot a archivé le thread');
        await thread.setArchived(true);
    } else if(interaction.options.getSubcommand() === 'unarchive') {
        interaction.reply('Le bot a désarchivé le thread');
        await thread.setArchived(false);
    } else if(interaction.options.getSubcommand() === 'delete') {
        const channelId = interaction.options.getString('channel');
        const logChannel = client.channels.cache.get(channelId);
        await logChannel.send(`Le bot a supprimé le thread: ${thread.name}!`);
        await thread.delete();
    }
}