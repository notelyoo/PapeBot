/**
  📁 File: sendChatMessage.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const axios = require('axios');
const getUserIdFromTwitch = require('./getUserIdFromTwitch');

async function sendChatMessage(message) {
    const broadcaster = await getUserIdFromTwitch(process.env.TWITCH_CHANNEL);
    const sender = await getUserIdFromTwitch(process.env.TWITCH_BOT_USERNAME);

    if (!broadcaster || !sender) {
        console.error('❌ Impossible de récupérer les IDs Twitch');
        return false;
    }

    try {
        const response = await axios.post('https://api.twitch.tv/helix/chat/messages', {
            broadcaster_id: broadcaster,
            sender_id: sender,
            message: message
        }, {
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        return response.status === 200;
    } catch (error) {
        const err = error.response?.data || error.message;
        console.error('❌ Erreur API Twitch (chat message) :', err);
        return false;
    }
}

module.exports = sendChatMessage;