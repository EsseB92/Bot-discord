import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";


/* MUTE = TIMEOUT */
export const name = 'mute';
export const category = 'moderation';
export const permissions = [PermissionFlagsBits.ModerateMembers];
export const ownerOnly = false;
export const usage = 'mute [@cible] [durée] [raison]';
export const examples = ['mute \`cible:\`@SB92270 \`durée:\`4 minutes\`raison:\`Spamming', 'mute \`cible:\`@SB92270 \`durée:\`60 s\`raison:\`Spamming'];
export const description = 'Exclure(mute) temporairement un membre du serveur';
export const options = [
    {
        name: "cible",
        description: "Quel membre du serveur souhaitez-vous exclure(mute)?",
        type: ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "durée",
        description: "Pour combien de jours doit-il être exclu(mute)? (en secondes, minutes, heures ou jours)",
        type: ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "raison",
        description: "Pour quel motif dois-je l'exclure(mute)",
        type: ApplicationCommandOptionType.String,
        required: true,
    }
];
export async function runInteraction(client, interaction) {
    const target = interaction.options.getMember('cible');
    const duration = interaction.options.getString('durée');
    const words = duration.split(' ');
    let convertedTime = 0;

    
    if(words.length !== 2) return interaction.reply({ content: `Il faut spécifier une durée valable (exemple : 60 sec, 10 min, 1 heure, 3 jours)`, ephemeral: true });
    
    const firstWord = words[0];
    let lastWord = words[1];

    switch (lastWord) {
        case 'secondes':
        case 'seconde':
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            convertedTime = (parseInt(firstWord) * 1000);
            break;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            convertedTime = (parseInt(firstWord) * 60 * 1000);
            break;
        case 'heures':
        case 'heure':
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            convertedTime = (parseInt(firstWord) * 60 * 60 * 1000);
            break;
        case 'jours':
        case 'jour':
        case 'j':
        case 'days':
        case 'day':
        case 'd':
            convertedTime = (parseInt(firstWord) * 24 * 60 * 60 * 1000);
            break;
        default:
            return interaction.reply({ content: `Il faut spécifier une durée valable (exemple : 60 sec, 10 min, 1 heure, 3 jours)`, ephemeral: true });
    }
    
    const reason = interaction.options.getString('raison');

    if(!target.moderatable) return interaction.reply({ content: `Le membre ${target} ne peut pas être exclu(mute) du serveur`, ephemeral: true });
    if(!convertedTime) return interaction.reply({ content: `Spécifier une durée valable`, ephemeral: true });


    target.timeout( convertedTime, reason );
    interaction.reply({ content: `Le membre ${target} a été exclu(mute) temporairement pour ${duration}!`, ephemeral: true })
}