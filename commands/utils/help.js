import { EmbedBuilder, PermissionFlagsBits, ApplicationCommandOptionType, PermissionsBitField } from 'discord.js';
import { readdirSync } from 'fs';
const commandFolder = readdirSync('./commands');

const contextDescription = {
    userinfo: 'Renvoie des informations sur l\'utilisateur'
}

export const name = 'help';
export const category = 'utils';
export const permissions = [PermissionFlagsBits.SendMessages];
export const ownerOnly = false;
export const usage = 'help <commande>';
export const examples = ['help', 'help ping', 'help poll'];
export const description = 'Renvoie une liste de commandes filtrée par catégorie';
export const options = [
    {
        name: 'commande',
        description: 'Taper le nom de votre commande',
        type: ApplicationCommandOptionType.String,
        required: false
    }
];
export function runInteraction(client, interaction) {
    const cmdName = interaction.options.getString('commande');

    if (!cmdName) {
        const noArgsEmbed = new EmbedBuilder()
            .setColor('#4c00b0')
            .addFields({ name: 'Liste des commandes', value: `Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commandes, tapez \`/help <commande>\`` });

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

    const description = `${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}\n\n**Exemples d'utilisation:** /${cmd.examples.join(` | /`)}\n**Permissions:** ${new PermissionsBitField(cmd.permissions).toArray().join(', ')}\n---\n`;

    const footer = `*{} = sous-commande(s) disponible(s) | [] = option(s) obligatoire(s) | <> = option(s) optionnelle(s)\n*Ne pas inclure ces caractères -> {}, [] et <> dans vos commandes.`;

    const argsEmbed = new EmbedBuilder()
        .setColor('#4c00b0')
        .setTitle(`Informations sur la commande ${cmd.name}`)
        .setDescription(description)
        .setFooter({ text: footer });

    return interaction.reply({ embeds: [argsEmbed], ephemeral: true });

//     return interaction.reply({ content: `
//         \`\`\`makefile
// [Help: Commande -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Pour les admins du bot uniquement /!\\' : ''}

// ${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

// Utilisation: /${cmd.usage}
// Exemples: /${cmd.examples.join(` | /`)}
// Permissions: ${new PermissionsBitField(cmd.permissions).toArray().join(', ')}

// ---

// {} = sous-commande(s) disponible(s) | [] = option(s) obligatoire(s) | <> = option(s) optionnelle(s)
// Ne pas inclure ces caractères -> {}, [] et <> dans vos commandes.
// \`\`\``, ephemeral: true });
}