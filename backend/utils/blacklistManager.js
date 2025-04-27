/**
 * 📁 File: utils/blacklistManager.js
 * 🧑‍💻 Developed by: Elyoo (NotElyoo)
 * 📬 Contact: contact@miyeon.fr
 */

const fs = require('fs');
const path = require('path');
const timeoutUser = require('./timeoutUser');

const blacklistPath = path.join(__dirname, '..', 'blacklistedUsers.json');
const activeTimeouts = {};

function loadBlacklist() {
    if (!fs.existsSync(blacklistPath)) return {};
    return JSON.parse(fs.readFileSync(blacklistPath, 'utf8'));
}

function saveBlacklist(data) {
    fs.writeFileSync(blacklistPath, JSON.stringify(data, null, 2), 'utf8');
}

function addToBlacklist(pseudo) {
    const blacklist = loadBlacklist();
    const lower = pseudo.toLowerCase();
    blacklist[lower] = { addedAt: Date.now() };
    saveBlacklist(blacklist);
    programBlacklistTimeout(lower);
}

function removeFromBlacklist(pseudo) {
    const blacklist = loadBlacklist();
    const lower = pseudo.toLowerCase();
    delete blacklist[lower];
    saveBlacklist(blacklist);

    if (activeTimeouts[lower]) {
        clearTimeout(activeTimeouts[lower]);
        delete activeTimeouts[lower];
    }
}

function getBlacklist() {
    return loadBlacklist();
}

function programBlacklistTimeout(pseudo) {
    const TIMEOUT_DURATION_SEC = 1209600;
    const TIMER_DELAY_MS = (TIMEOUT_DURATION_SEC + 0.01) * 1000;
    const channelName = process.env.TWITCH_CHANNEL;
    const reason = "Vous avez été blacklisté suite à un comportement inapproprié.";

    async function repeatTimeout() {
        console.log(`⏳ Retiming ${pseudo} automatiquement`);
        const success = await timeoutUser(channelName, pseudo, TIMEOUT_DURATION_SEC, reason);
        if (success) {
            console.log(`✅ Timeout 14j appliqué à ${pseudo}`);
        } else {
            console.error(`❌ Impossible de timeout ${pseudo}`);
        }
        activeTimeouts[pseudo] = setTimeout(repeatTimeout, TIMER_DELAY_MS);
    }

    activeTimeouts[pseudo] = setTimeout(repeatTimeout, TIMER_DELAY_MS);
}

module.exports = {
    addToBlacklist,
    removeFromBlacklist,
    getBlacklist,
    programBlacklistTimeout
};