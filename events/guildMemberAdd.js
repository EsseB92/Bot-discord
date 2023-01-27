client.on('guildMemberAdd', async member => {
    try {
        const role = member.guild.roles.cache.find(role => role.name === "Nouveau membre");
        if (!role) return console.log("Le rôle n'existe pas");
        await member.roles.add(role);
    } catch (error) {
        console.log(error);
    }
});