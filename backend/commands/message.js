/**
  📁 File: message.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const createEmbed = require('../utils/createEmbed');
const sendChatMessage = require('../utils/sendChatMessage');
const { MessageFlags } = require('discord.js');

module.exports = {
    name: "message",
    description: "Envoyer un message dans le chat Twitch via l'API officielle.",
    options: [
        {
            name: 'message',
            type: 'STRING',
            description: 'Le message à envoyer',
            required: true
        }
    ],
    run: async (interaction) => {
        const msg = interaction.options.getString('message');

        const success = await sendChatMessage(msg);

        const embed = success
            ? createEmbed('✅ Message envoyé', `Message envoyé dans le chat : **${msg}**`, 0x00FF00)
            : createEmbed('⚠️ Erreur', `Impossible d’envoyer le message via l'API Twitch. Vérifie les scopes et les IDs.`, 0xFF0000);

        await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    }
};