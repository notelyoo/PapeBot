/**
  📁 File: warn.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const warnUser = require('../utils/warnUser');
const createEmbed = require('../utils/createEmbed');

module.exports = {
    name: "warn",
    description: "Avertir un utilisateur sur Twitch.",
    options: [
        {
            name: 'pseudo',
            type: 'STRING',
            description: 'Le pseudonyme',
            required: true
        },
        {
            name: 'raison',
            type: 'STRING',
            description: 'Raison de l\'avertissement',
            required: false
        }
    ],
    run: async (interaction) => {
        const pseudo = interaction.options.getString('pseudo');
        const raison = interaction.options.getString('raison') || 'Aucune raison spécifiée';

        let embed = null;
        if (await warnUser(process.env.TWITCH_CHANNEL, pseudo, raison)) {
            embed = createEmbed('⚠️ Avertissement', `**${pseudo}** a été averti : **${raison}**`, 0xFFA500);
        } else {
            embed = createEmbed('❌ Erreur', 'Échec de l\'avertissement.', 0xFF0000);
        }
        await interaction.reply({ embeds: [embed] });
    }
};