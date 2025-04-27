/**
  📁 File: clips.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const createClip = require('../utils/createClip');
const createEmbed = require('../utils/createEmbed');

module.exports = {
    name: "clips",
    description: "Créer un clip du live Twitch et l'envoyer sur Discord.",
    run: async (interaction) => {
        const clipUrl = await createClip(process.env.TWITCH_CHANNEL);

        let embed = null;
        if (clipUrl) {
            embed = createEmbed('🎬 Clip Créé', `[Clique ici pour éditer ton clip](${clipUrl})`, 0x9146FF);
        } else {
            embed = createEmbed('⚠️ Erreur', "Impossible de créer le clip. Vérifie que le live est bien en cours **et que le bot a le droit de créer des clips (`clips:edit`)**.", 0xFF0000);
        }        
        await interaction.reply({ embeds: [embed] });
    }
};