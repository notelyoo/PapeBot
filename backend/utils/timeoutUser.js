const axios = require('axios');
const getUserIdFromTwitch = require('./getUserIdFromTwitch');
const getModeratorId = require('./getModeratorId');

// Fonction pour appliquer un timeout à un utilisateur sur Twitch
async function timeoutUser(channelName, targetUser, duration, reason) {
    try {
        // Vérifier si la durée est valide (doit être positive et non nulle)
        if (duration <= 0 || duration > 1209600) { // La durée doit être entre 1 et 2 semaines
            console.error('❌ Durée de timeout invalide.');
            return false;
        }

        const broadcasterId = await getUserIdFromTwitch(channelName);
        const userId = await getUserIdFromTwitch(targetUser);
        const moderatorId = await getModeratorId();

        if (!broadcasterId || !userId || !moderatorId) {
            throw new Error('Utilisateur ou modérateur introuvable');
        }

        await axios.post('https://api.twitch.tv/helix/moderation/bans', {
            broadcaster_id: broadcasterId,
            moderator_id: moderatorId,
            data: { user_id: userId, duration: duration, reason }
        }, {
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(`✅ Timeout appliqué à ${targetUser} pendant ${duration} secondes.`);
        return true;
    } catch (error) {
        console.error(`❌ Erreur timeout Twitch:`, error.response?.data || error.message);
        return false;
    }
}

module.exports = timeoutUser;