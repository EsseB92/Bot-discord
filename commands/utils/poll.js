const { EmbedBuilder } = require('discord.js');

module.exports =  {
    name: 'poll',
    description: 'Poster votre propre sondage!',
    async runSlash(client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');

        const embed = new EmbedBuilder()
            .setTitle(pollTitle)
            .setColor('#1528ff')
            .setDescription(pollContent)
            .setTimestamp()
            .setFooter({ text: `Nouveau sondage généré par ${interaction.user.tag}!` })

        const poll = await interaction.reply({ embeds: [embed], fetchReply: true });
        poll.react('✅');
        poll.react('❌');
    }
};