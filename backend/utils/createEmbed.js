/**
  📁 File: createEmbed.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const { EmbedBuilder } = require('discord.js');

function createEmbed(title, description, color) {
    return new EmbedBuilder().setColor(color).setTitle(title).setDescription(description).setTimestamp();
}

module.exports = createEmbed;