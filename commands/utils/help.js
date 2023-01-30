import { EmbedBuilder, PermissionFlagsBits, ApplicationCommandOptionType, PermissionsBitField } from 'discord.js';
import { readdirSync } from 'fs';
const commandFolder = readdirSync('./commands');

export const name = 'help';
export const category = 'utils';
export const permissions = [PermissionFlagsBits.Administrator];
export const description = 'Commande help';
export const options = [
    {
        name: 'command',
        description: 'Taper le nom de votre commande',
        type: ApplicationCommandOptionType.String,
        required: false
    }
];
export function runInteraction(client, interaction) {
    const cmdName = interaction.options.getString('command');

    if (!cmdName) {
        const noArgsEmbed = new EmbedBuilder()
            .setColor('#c4108b')
            .addFields({ name: 'Liste des commandes', value: `Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commandes, tapez \`/help <command>\`` });

        for (const category of commandFolder) {
            noArgsEmbed.addFields({
                name: `- ${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                value: `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
            });
        }

        return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true });
    }

    const cmd = client.commands.get(cmdName);
    if (!cmd)
        return interaction.reply({ content: 'cette commande n\'existe pas!', ephemeral: true });

    const argsEmbed = new EmbedBuilder()
        .setColor('#c4108b')
        .setTitle(`\`${cmd.name}\``)
        .setDescription(cmd.description)
        .setFooter({ text: `Permission(s) requise(s): ${new PermissionsBitField(cmd.permissions).toArray().join(', ')}` });

    return interaction.reply({ embeds: [argsEmbed], ephemeral: true });
}