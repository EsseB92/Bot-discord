module.exports =  {
    name: 'emit',
    description: 'Emettre un évènement au choix!',
    options: [
        {
            name: "event",
            description: "Choisir un évènement à émettre",
            type: 3,
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
    ],
    runInteraction(client, interaction) {
        const eventChoices = interaction.options.getString('event');

        if (eventChoices == 'guildMemberAdd') {
            client.emit('guildMemberAdd', interaction.member);
            interaction.reply({ content: 'Event guildMemberAdd émit!', ephemeral: true });
        } 
        else if(eventChoices == 'guildMemberRemove') {
            client.emit('guildMemberRemove', interaction.member);
            interaction.reply({ content: 'Event guildMemberRemove émit!', ephemeral: true });
        } 
        else if(eventChoices == 'guildCreate') {
            client.emit('guildCreate', interaction.guild);
            interaction.reply({ content: 'Event guildCreate émit!', ephemeral: true });
        } else {
            console.log(`${eventChoices} n'est pas valide!`);
        }
    }
};