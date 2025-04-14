/**
  📁 File: announce.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const sendMessage = require('../utils/sendMessage');
const createEmbed = require('../utils/createEmbed');
const { activeAnnouncements } = require('./liste');
const { isLive } = require('../utils/liveWatcher');

let shouldContinueToSendMessages = true;

module.exports = {
    name: "annonce",
    description: "Faire une annonce dans le chat Twitch.",
    options: [
        {
            name: 'message',
            type: 'STRING',
            description: 'Le message à annoncer',
            required: true
        },
        {
            name: 'interval',
            type: 'INTEGER',
            description: 'Intervalle en minutes entre chaque annonce.',
            required: false
        }
    ],
    run: async (interaction) => {
        const message = interaction.options.getString('message');
        const interval = interaction.options.getInteger('interval');
        let embed = null;

        if (interval) {
            const intervalMs = interval * 60 * 1000;
            const id = `${Date.now()}`;

            activeAnnouncements.set(id, {
                message,
                interval,
                intervalID: null,
                active: false
            });

            embed = createEmbed('⏱️ Annonce programmée', `Le message sera annoncé toutes les ${interval} minutes (quand le live sera en ligne) :\n**${message}**`, 0x00FF00);
        } else {
            if (await sendMessage(process.env.TWITCH_CHANNEL, message)) {
                embed = createEmbed('✅ Annonce', `Le message a été annoncé : **${message}**`, 0x00FF00);
            } else {
                embed = createEmbed('⚠️ Erreur', 'Échec de l\'annonce du message.', 0xFF0000);
            }
        }

        await interaction.reply({ embeds: [embed] });
    }
};