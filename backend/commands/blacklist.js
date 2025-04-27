/**
 * 📁 File: commands/blacklist.js
 * 🧑‍💻 Developed by: Elyoo (NotElyoo)
 * 📬 Contact: contact@miyeon.fr
 */

const createEmbed = require('../utils/createEmbed');
const { addToBlacklist } = require('../utils/blacklistManager');
const timeoutUser = require('../utils/timeoutUser');

module.exports = {
    name: 'blacklist',
    description: 'Blacklist un utilisateur (timeout toutes les 2 semaines).',
    options: [
        {
            name: 'pseudo',
            type: 'STRING',
            description: 'Le pseudo Twitch à blacklister.',
            required: true
        }
    ],
    run: async (interaction) => {
        const pseudo = interaction.options.getString('pseudo');

        const reason = "Vous avez été blacklisté suite à un comportement inapproprié.";
        const success = await timeoutUser(process.env.TWITCH_CHANNEL, pseudo, 1209600, reason);

        if (success) {
            addToBlacklist(pseudo);

            const embed = createEmbed('✅ Utilisateur blacklisté', `**${pseudo}** a été timeout pour 14 jours et ajouté à la blacklist.`, 0x00FF00);
            await interaction.reply({ embeds: [embed] });
        } else {
            const embed = createEmbed('❌ Erreur', `Impossible d'appliquer le timeout à **${pseudo}**.`, 0xFF0000);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
};