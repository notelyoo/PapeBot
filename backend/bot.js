/**
  📁 File: bot.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

  const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
  require('dotenv').config();
  const fs = require('fs');
  const path = require('path');
  const sendMessage = require('./utils/sendMessage');
  const sendChatMessage = require('./utils/sendChatMessage');
  const timeoutUser = require('./utils/timeoutUser');
  const tmi = require('tmi.js');
  const getTimezone = require('./utils/getTimezone');
  const moment = require('moment-timezone');
  const { startLiveWatcher } = require('./utils/liveWatcher');
  const { getCommandResponse } = require('./utils/customCommands');
  const { getBlacklist, programBlacklistTimeout } = require('./utils/blacklistManager');
  
  const filesToCheck = [
    { path: path.join(__dirname, 'customCommands.json'), defaultContent: '{}' },
    { path: path.join(__dirname, 'blacklistedUsers.json'), defaultContent: '{}' },
    { path: path.join(__dirname, 'userTimezones.json'), defaultContent: '{}' },
    { path: path.join(__dirname, 'config.json'), defaultContent: '{\n  "discordAnnounceChannelId": ""\n}' }
];

let missingFiles = 0;

filesToCheck.forEach(file => {
    if (!fs.existsSync(file.path)) {
        console.log(`📄 Fichier manquant détecté : ${path.basename(file.path)}. Création automatique...`);
        fs.writeFileSync(file.path, file.defaultContent, 'utf8');
        missingFiles++;
    }
});

if (missingFiles === 0) {
    console.log('✅ Tous les fichiers nécessaires sont en place.');
} else {
    console.log(`✅ Tous les fichiers nécessaires sont maintenant créés (${missingFiles} fichier(s) ajouté(s)).`);
}
  
  const twitchClient = new tmi.Client({
      identity: {
          username: process.env.TWITCH_BOT_USERNAME,
          password: process.env.TWITCH_OAUTH_TOKEN,
      },
      channels: [process.env.TWITCH_CHANNEL]
  });
  
  twitchClient.on('message', (channel, tags, message, self) => {
      if (self) return;
  
      const trimmedMessage = message.trim();
  
      if (trimmedMessage === '!heure') {
          const timezone = getTimezone();
  
          if (!timezone) {
              sendMessage(process.env.TWITCH_CHANNEL, `Aucun fuseau horaire n'a été défini. Veuillez le configurer via la commande /heure sur Discord.`);
              return;
          }
  
          const currentTime = moment().tz(timezone).format('HH[H]mm');
          sendMessage(process.env.TWITCH_CHANNEL, `🕐 Il est ${currentTime} à ${timezone.split("/")[1]}`);
          return;
      }
  
      if (trimmedMessage.startsWith('!')) {
          const commandName = trimmedMessage.slice(1).toLowerCase();
          const response = getCommandResponse(commandName);
  
          if (response) {
              sendChatMessage(response);
          }
      }
  });
  
  twitchClient.connect().then(() => {
      console.log('✅ Bot Twitch connecté au canal');
  }).catch(console.error);
  
  console.log("\n====================================");
  console.log("🚀 DÉMARRAGE DU BOT DISCORD...");
  console.log("====================================\n");
  
  const discordClient = new Client({
      intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent
      ]
  });
  
  console.log("📁 Chargement des commandes...");
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  
  if (commandFiles.length === 0) {
      console.warn("⚠️ Aucune commande trouvée.");
  } else {
      console.log(`✅ ${commandFiles.length} commande(s) détectée(s) :`, commandFiles);
  }
  
  const commandModules = commandFiles.map(file => {
      try {
          return require(`./commands/${file}`);
      } catch (error) {
          console.error(`❌ Erreur lors du chargement de ${file} :`, error);
          return null;
      }
  }).filter(Boolean);
  
  discordClient.once('ready', async () => {
      console.log(`\n✅ Connecté en tant que ${discordClient.user.tag}`);
  
      try {
          console.log("🔄 Enregistrement des commandes Slash...");
          const slashCommands = commandModules.map(commandModule => {
              const slashCommand = new SlashCommandBuilder()
                  .setName(commandModule.name)
                  .setDescription(commandModule.description);
  
              if (Array.isArray(commandModule.options)) {
                  commandModule.options.forEach(option => {
                      if (option.type === 'STRING') {
                          slashCommand.addStringOption(opt =>
                              opt.setName(option.name)
                                  .setDescription(option.description)
                                  .setRequired(option.required)
                          );
                      } else if (option.type === 'INTEGER') {
                          slashCommand.addIntegerOption(opt =>
                              opt.setName(option.name)
                                  .setDescription(option.description)
                                  .setRequired(option.required)
                          );
                      }
                  });
              }
  
              return slashCommand;
          });
  
          await discordClient.application.commands.set([]);
          console.log("🧹 Commandes Slash supprimées.");
  
          await discordClient.application.commands.set(slashCommands);
          console.log("✅ Nouvelles commandes Slash enregistrées !");
      } catch (error) {
          console.error("❌ Erreur lors de l'enregistrement des commandes Slash :", error);
      }
  
      console.log("\n🔍 Vérification des services externes...");
      try {
          const twitchClientId = process.env.TWITCH_CLIENT_ID;
          const twitchOAuth = process.env.TWITCH_OAUTH_TOKEN;
  
          if (!twitchClientId || !twitchOAuth) {
              console.warn("⚠️ Clés API Twitch non trouvées. Vérifie ton fichier .env.");
          } else {
              console.log("✅ Connexion API Twitch : Clés trouvées.");
          }
  
      } catch (error) {
          console.error("❌ Erreur lors de la vérification des services externes :", error);
      }
  
      console.log("\n🚀 BOT OPÉRATIONNEL !\n====================================\n");
  
      startLiveWatcher(discordClient);
  
      startBlacklistTimers();
  });
  
  discordClient.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
  
      const command = interaction.commandName;
      const cmd = commandModules.find(cmd => cmd.name === command);
      if (!cmd) {
          console.warn(`⚠️ Commande inconnue : ${command}`);
          return;
      }
  
      try {
          await cmd.run(interaction);
      } catch (error) {
          console.error(`❌ Erreur lors de l'exécution de ${command} :`, error);
          await interaction.reply({ content: '❌ Une erreur est survenue lors de l’exécution de cette commande.', ephemeral: true });
      }
  });
  
  discordClient.login(process.env.DISCORD_TOKEN);
  
  function startBlacklistTimers() {
      console.log("🔄 Programmation des timeouts automatiques pour les blacklistés");
  
      const blacklist = getBlacklist();
  
      for (const pseudo of Object.keys(blacklist)) {
          programBlacklistTimeout(pseudo);
      }
  }  