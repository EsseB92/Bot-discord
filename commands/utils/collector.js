import { ActionRowBuilder, ButtonBuilder, PermissionFlagsBits, ButtonStyle } from 'discord.js';

export const name = 'collector';
export const category = 'utils';
export const permissions = [PermissionFlagsBits.SendMessages];
export const ownerOnly = false;
export const usage = 'collector';
export const examples = ['collector'];
export const description = "collector";
export async function runInteraction(client, interaction) {
    interaction.reply("Tapez le message \`discord\`");
    const filter = msg => msg.content.includes("discord");
    const collector = interaction.channel.createMessageCollector({ filter, time: 5_000 });
    collector.on('collect', m => console.log(`Collected ${m.content}`));
    collector.on('end', collected => {
        interaction.followUp(`${collected.size - 1} messages collectés!`);
        console.log(`Collected ${collected.size - 1} items`);
    });
}