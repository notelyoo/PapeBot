/**
  📁 File: heure.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const createEmbed = require('../utils/createEmbed');
const setTimezone = require('../utils/setTimezone');

module.exports = {
    name: "heure",
    description: "Définir le fuseau horaire pour le bot Twitch",
    options: [
        {
            name: 'timezone',
            type: 'STRING',
            description: 'Ex: Europe/Paris, America/New_York, etc.',
            required: true
        }
    ],
    run: async (interaction) => {
        const timezone = interaction.options.getString('timezone');

        setTimezone(timezone);

        const embed = createEmbed(
            'Fuseau horaire mis à jour',
            `Le fuseau horaire a été défini sur : **${timezone}**`,
            0x00FF00
        );

        await interaction.reply({ embeds: [embed] });
    }
};