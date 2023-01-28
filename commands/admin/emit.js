module.exports =  {
    name: 'emit',
    description: 'Emettre un évènement au choix!',
    runSlash(client, interaction) {
        const eventChoices = interaction.options.getString('event');

        if (eventChoices == 'guildMemberAdd') {
            client.emit('guildMemberAdd', interaction.member);
            interaction.reply({ content: 'Event guildMemberAdd émit!', ephemereal: true });
        } else {
            client.emit('guildMemberRemove', interaction.member);
            interaction.reply({ content: 'Event guildMemberRemove émit!', ephemereal: true });
        }
    }
};