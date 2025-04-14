/**
  📁 File: config.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const fs = require('fs');
const path = require('path');
const createEmbed = require('../utils/createEmbed');

const configPath = path.join(__dirname, '..', 'config.json');

module.exports = {
    name: 'config',
    description: 'Définit le salon Discord pour les annonces de début de live.',
    options: [
        {
            name: 'channel',
            type: 'STRING',
            description: 'ID ou mention du salon Discord',
            required: true
        }
    ],
    run: async (interaction) => {
        const channelInput = interaction.options.getString('channel');

        const channelId = channelInput.replace(/[<#>]/g, '');

        const channel = interaction.guild.channels.cache.get(channelId);
        if (!channel) {
            const embed = createEmbed('❌ Erreur', `Salon introuvable : ${channelInput}`, 0xFF0000);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const data = {
            discordAnnounceChannelId: channelId
        };

        try {
            fs.writeFileSync(configPath, JSON.stringify(data, null, 2), 'utf8');
            const embed = createEmbed('✅ Configuration sauvegardée', `Les annonces seront envoyées dans : <#${channelId}>`, 0x00FF00);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error("❌ Erreur d'écriture dans config.json :", error);
            const embed = createEmbed('❌ Erreur', 'Impossible de sauvegarder la configuration.', 0xFF0000);
            await interaction.reply({ embeds: [embed] });
        }
    }
};