/**
 * 📁 File: commands/listBlacklist.js
 * 🧑‍💻 Developed by: Elyoo (NotElyoo)
 * 📬 Contact: contact@miyeon.fr
 */

const createEmbed = require('../utils/createEmbed');;
const { getBlacklist } = require('../utils/blacklistManager');

module.exports = {
    name: 'liste-blacklist',
    description: 'Lister tous les utilisateurs actuellement blacklistés.',
    run: async (interaction) => {
        const blacklist = getBlacklist();
        const pseudos = Object.keys(blacklist);

        if (pseudos.length === 0) {
            const embed = createEmbed('📭 Aucune blacklist', 'Il n\'y a actuellement aucun utilisateur blacklisté.', 0xFFA500);
            return interaction.reply({ embeds: [embed] });
        }

        const embed = createEmbed('📜 Utilisateurs blacklistés', 'Voici les utilisateurs actuellement blacklistés :', 0x00AAFF);

        pseudos.forEach((pseudo, index) => {
            const nextTimeoutDate = new Date(blacklist[pseudo].nextTimeout).toLocaleDateString('fr-FR');
            embed.addFields({
                name: `#${index + 1} - ${pseudo}`,
                value: `🔁 Prochain timeout prévu : **${nextTimeoutDate}**`
            });
        });

        await interaction.reply({ embeds: [embed] });
    }
};