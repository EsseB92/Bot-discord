const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('guildMemberAdd', member => {
  // Replace "welcome" with the name of your welcome channel
  const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
  welcomeChannel.send(`Bienvenue ${member} sur notre serveur!`);
});

client.login(process.env.TOKEN);