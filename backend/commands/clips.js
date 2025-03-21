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
            embed = createEmbed('⚠️ Impossible de créer le clip', "Le live doit être en cours pour créer un clip.", 0xFF0000);
        }
        await interaction.reply({ embeds: [embed] });
    }
};
