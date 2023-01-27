module.exports = (client, member) => {
    const role = member.guild.roles.cache.find(role => role.name === "Nouveau membre");
    member.roles.add(role);
    member.send("Bienvenue sur le serveur ! Nous t'avons attribué le rôle de 'nouveau membre'.");
}
