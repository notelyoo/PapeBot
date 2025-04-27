/**
  📁 File: banUser.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const axios = require('axios');
const getUserIdFromTwitch = require('./getUserIdFromTwitch');
const getModeratorId = require('./getModeratorId');

async function banUser(channelName, targetUser, reason) {
    try {
        const broadcasterId = await getUserIdFromTwitch(channelName);
        const userId = await getUserIdFromTwitch(targetUser);
        const moderatorId = await getModeratorId();

        if (!broadcasterId || !userId || !moderatorId) throw new Error('Utilisateur ou modérateur introuvable');

        await axios.post('https://api.twitch.tv/helix/moderation/bans', {
            broadcaster_id: broadcasterId,
            moderator_id: moderatorId,
            data: { user_id: userId, reason }
        }, {
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        return true;
    } catch (error) {
        console.error(`❌ Erreur ban Twitch:`, error.response?.data || error.message);
        return false;
    }
}

module.exports = banUser;