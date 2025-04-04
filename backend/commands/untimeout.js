/**
  📁 File: untimeout.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const createEmbed = require('../utils/createEmbed');
const unbanUser = require('../utils/unbanUser');

module.exports = {
    name: "untimeout",
    description: "Annuler un timeout sur Twitch",
    options: [
        {
            name: 'pseudo',
            type: 'STRING',
            description: 'Le pseudonyme',
            required: true
        },
    ],
    run: async (interaction) => {
        const pseudo = interaction.options.getString('pseudo');

        let embed = null;
        if (await unbanUser(process.env.TWITCH_CHANNEL, pseudo)) {
            embed = createEmbed('✅ Timeout annulé', `Le timeout de **${pseudo}** a été annulé.`, 0x00FF00);
        } else {
            embed = createEmbed('⚠️ Erreur', 'Échec de l’annulation du timeout.', 0xFF0000);
        }
        await interaction.reply({ embeds: [embed] });
    }
};