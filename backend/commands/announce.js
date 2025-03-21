const sendMessage = require('../utils/sendMessage');
const createEmbed = require('../utils/createEmbed');

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
        const interval = interaction.options.getInteger('interval'); // Récupère l'option intervalle (en minutes)

        let embed = null;

        if (interval) {
            // Si un intervalle est défini, envoyer périodiquement
            let intervalMilliseconds = interval * 60 * 1000;

            // Démarre un envoi périodique
            const intervalID = setInterval(async () => {
                if (!shouldContinueToSendMessages) {
                    clearInterval(intervalID); // Arrête l'intervalle si la condition est fausse
                    return;
                }
                await sendMessage(process.env.TWITCH_CHANNEL, message);
            }, intervalMilliseconds);

            embed = createEmbed('✅ Annonce Périodique', `Le message sera annoncé toutes les ${interval} minutes: **${message}**`, 0x00FF00);
        } else {
            // Sinon, envoyer une seule fois
            if (await sendMessage(process.env.TWITCH_CHANNEL, message)) {
                embed = createEmbed('✅ Annonce', `Le message a été annoncé: **${message}**`, 0x00FF00);
            } else {
                embed = createEmbed('⚠️ Erreur', 'Échec de l\'annonce du message.', 0xFF0000);
            }
        }

        // Répondre à la commande avec l'embed
        await interaction.reply({ embeds: [embed] });
    }
};

// Fonction pour arrêter l'envoi périodique
function stopPeriodicMessages() {
    shouldContinueToSendMessages = false;
}