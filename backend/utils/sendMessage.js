/**
  📁 File: sendMessage.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const axios = require('axios');
const getUserIdFromTwitch = require('./getUserIdFromTwitch');
const getModeratorId = require('./getModeratorId');

async function sendMessage(channel, message) {
    try {
        const moderatorId = await getModeratorId();
        const broadcasterId = await getUserIdFromTwitch(channel);
        if (!broadcasterId) throw new Error('Chaine ou utilisateur introuvable');
        if (!moderatorId) throw new Error('Modérateur introuvable');

        const response = await axios.post('https://api.twitch.tv/helix/chat/announcements', {
            broadcaster_id: broadcasterId,
            moderator_id: moderatorId,
            message: message
        }, {
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("Message envoyé avec succès:", response.data);
        return true;
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi du message sur Twitch:', error.response?.data || error.message);
        return false;
    }
}

module.exports = sendMessage;