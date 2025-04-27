/**
  📁 File: getModeratorId.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const axios = require('axios');

async function getModeratorId() {
    try {
        const response = await axios.get('https://api.twitch.tv/helix/users', {
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`
            }
        });
        return response.data.data.length ? response.data.data[0].id : null;
    } catch (error) {
        console.error(`❌ Erreur récupération ID Modérateur:`, error.response?.data || error.message);
        return null;
    }
}

module.exports = getModeratorId;