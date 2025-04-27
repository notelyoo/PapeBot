/**
  📁 File: createClip.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const axios = require('axios');
const getUserIdFromTwitch = require('./getUserIdFromTwitch');

async function createClip(channelName) {
    try {
        const broadcasterId = await getUserIdFromTwitch(channelName);
        if (!broadcasterId) throw new Error('ID du broadcaster introuvable');

        const response = await axios.post(`https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}`, {}, {
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data?.data?.length > 0) {
            return response.data.data[0].edit_url;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`❌ Erreur lors de la création du clip:`, error.response?.data || error.message);
        return null;
    }
}

module.exports = createClip;