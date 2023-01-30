import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

export const name = 'emit';
export const category = 'admin';
export const description = 'Emettre un évènement au choix!';
export const permissions = [PermissionFlagsBits.Administrator];
export const options = [
    {
        name: "event",
        description: "Choisir un évènement à émettre",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            {
                name: 'guildMemberAdd',
                value: 'guildMemberAdd',
            },
            {
                name: 'guildMemberRemove',
                value: 'guildMemberRemove',
            },
            {
                name: 'guildCreate',
                value: 'guildCreate',
            }
        ],
    },
];
export function runInteraction(client, interaction) {
    const eventChoices = interaction.options.getString('event');

    if (eventChoices == 'guildMemberAdd') {
        client.emit('guildMemberAdd', interaction.member);
        interaction.reply({ content: 'Event guildMemberAdd émit!', ephemeral: true });
    }
    else if (eventChoices == 'guildMemberRemove') {
        client.emit('guildMemberRemove', interaction.member);
        interaction.reply({ content: 'Event guildMemberRemove émit!', ephemeral: true });
    }
    else if (eventChoices == 'guildCreate') {
        client.emit('guildCreate', interaction.guild);
        interaction.reply({ content: 'Event guildCreate émit!', ephemeral: true });
    } else {
        console.log(`${eventChoices} n'est pas valide!`);
    }
}