/**
  📁 File: timeout.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const createEmbed = require('../utils/createEmbed');
const timeoutUser = require('../utils/timeoutUser');

module.exports = {
    name: "timeout",
    description: "Timeout un utilisateur sur Twitch",
    options: [
        {
            name: 'pseudo',
            type: 'STRING',
            description: 'Le pseudonyme',
            required: true
        },
        {
            name: 'duree',
            type: 'INTEGER',
            description: 'Durée en secondes',
            required: true
        },
        {
            name: 'raison',
            type: 'STRING',
            description: 'Raison',
            required: false
        }
    ],
    run: async (interaction) => {
        const pseudo = interaction.options.getString('pseudo');
        const duree = interaction.options.getInteger('duree');
        const raison = interaction.options.getString('raison') || 'Aucune raison spécifiée';

        let embed = null;
        if (await timeoutUser(process.env.TWITCH_CHANNEL, pseudo, duree, raison)) {
            embed = createEmbed('✅ Timeout', `**${pseudo}** a été mis en timeout pour **${duree} secondes** : **${raison}**`, 0xFF8000);
        } else {
            embed = createEmbed('⚠️ Erreur', 'Échec du timeout, vérifiez les paramètres (utilisateur, durée, etc.).', 0xFF0000);
        }
        await interaction.reply({ embeds: [embed] });
    }
};