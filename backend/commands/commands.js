/**
 * 📁 File: commands/commande.js
 * 🧑‍💻 Developed by: Elyoo (NotElyoo)
 * 📬 Contact: contact@miyeon.fr
 */

const createEmbed = require('../utils/createEmbed');
const { addCommand } = require('../utils/customCommands');

module.exports = {
    name: 'commande',
    description: 'Ajouter une commande personnalisée pour le chat Twitch.',
    options: [
        {
            name: 'nom',
            type: 'STRING',
            description: 'Nom de la commande (sans le !)',
            required: true
        },
        {
            name: 'reponse',
            type: 'STRING',
            description: 'Message que le bot enverra lorsque la commande sera utilisée.',
            required: true
        }
    ],
    run: async (interaction) => {
        const nom = interaction.options.getString('nom').toLowerCase();
        const reponse = interaction.options.getString('reponse');

        if (!/^[a-zA-Z0-9]+$/.test(nom)) {
            const embed = createEmbed('❌ Nom invalide', 'Le nom de la commande ne peut contenir que des lettres et des chiffres (pas d\'espaces ni de caractères spéciaux).', 0xFF0000);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        addCommand(nom, reponse);

        const embed = createEmbed('✅ Commande personnalisée ajoutée', `La commande **!${nom}** a été ajoutée avec succès !\nRéponse : **${reponse}**`, 0x00FF00);
        await interaction.reply({ embeds: [embed] });
    }
};