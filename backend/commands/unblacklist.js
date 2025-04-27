/**
 * 📁 File: commands/unblacklist.js
 * 🧑‍💻 Developed by: Elyoo (NotElyoo)
 * 📬 Contact: contact@miyeon.fr
 */

const createEmbed = require('../utils/createEmbed');
const { removeFromBlacklist, getBlacklist } = require('../utils/blacklistManager');

module.exports = {
    name: 'unblacklist',
    description: 'Retirer un utilisateur de la blacklist.',
    options: [
        {
            name: 'pseudo',
            type: 'STRING',
            description: 'Le pseudo Twitch à retirer de la blacklist.',
            required: true
        }
    ],
    run: async (interaction) => {
        const pseudo = interaction.options.getString('pseudo').toLowerCase();
        const blacklist = getBlacklist();

        if (!blacklist[pseudo]) {
            const embed = createEmbed('❌ Utilisateur non blacklisté', `**${pseudo}** n'est pas dans la blacklist.`, 0xFF0000);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        removeFromBlacklist(pseudo);

        const embed = createEmbed('✅ Utilisateur retiré', `**${pseudo}** a été retiré de la blacklist.`, 0x00FF00);
        await interaction.reply({ embeds: [embed] });
    }
};