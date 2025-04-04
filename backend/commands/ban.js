/**
  📁 File: ban.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const banUser = require('../utils/banUser');
const createEmbed = require('../utils/createEmbed');

module.exports = {
    name: "ban",
    description: "Bannir un utilisateur de Twitch.",
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
            description: 'Raison du bannissement',
            required: false
        }
    ],
    run: async (interaction) => {
        const pseudo = interaction.options.getString('pseudo');
        const raison = interaction.options.getString('raison') || 'Aucune raison spécifiée';

        let embed = null;
        if (await banUser(process.env.TWITCH_CHANNEL, pseudo, raison)) {
            embed = createEmbed('✅ Bannissement', `**${pseudo}** a été banni : **${raison}**`, 0xFF0000);
        } else {
            embed = createEmbed('⚠️ Erreur', 'Échec du bannissement.', 0xFF0000);
        }
        await interaction.reply({ embeds: [embed] });
    }
};