const { EmbedBuilder } = require('discord.js');

// Fonction pour créer un embed Discord avec des sections et des icônes
function createEmbed(title, description, color) {
    return new EmbedBuilder().setColor(color).setTitle(title).setDescription(description).setTimestamp();
}

module.exports = createEmbed;
