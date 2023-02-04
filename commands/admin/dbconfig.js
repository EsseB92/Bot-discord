import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

export const name = 'dbconfing';
export const category = 'admin';
export const permissions = [PermissionFlagsBits.Administrator];
export const ownerOnly = true;
export const usage = 'dbconfing [clé] <valeur>';
export const examples = ['dbconfing \`évènement:\`guildCreate', 'dbconfing guildMemberAdd'];
export const description = 'Configurer les données de la base de donnée';
export const options = [
    {
        name: "clé",
        description: "Quel salon souhaitez-vous modifier/afficher?",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            {
                name: 'Salon des logs des entrées et sorties',
                value: 'logsInOutChannel',
            },
            {
                name: 'Salon des logs de modération',
                value: 'testChannel',
            },
        ],
    },
    {
        name: "valeur",
        description: "Quel est la nouvelle valeur du salon?",
        type: ApplicationCommandOptionType.String,
    },
];
export async function runInteraction(client, interaction, guildSettings) {
    const key = interaction.options.getString('clé');
    const value = interaction.options.getString('valeur');

    if (key == 'logsInOutChannel') {
        if (value) {
            await client.updateGuild(interaction.guild, { logsInOutChannel: value });
            return interaction.reply({ content: `Le salon des logs de modération est : ${value}` });
        }
        interaction.reply({ content: `Le nouveau salon de logs est : ${guildSettings.logsInOutChannel}` });
    } else if (key == 'testChannel') {
        if (value) {
            await client.updateGuild(interaction.guild, { logsModerationChannel: value });
            return interaction.reply({ content: `Le salon de test est : ${value}` });
        }
        interaction.reply({ content: `Le nouveau salon de test est : ${guildSettings.logsModerationChannel}` });
    }
    // else if (key == 'prefix') {
    //     client.emit('guildMemberRemove', interaction.member);
    //     interaction.reply({ content: 'Event guildMemberRemove émit!', ephemeral: true });
    // }
}