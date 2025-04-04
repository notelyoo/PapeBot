/**
  📁 File: getTimezone.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const fs = require('fs');
const path = require('path');

const userTimezonesPath = path.join(__dirname, '..', 'userTimezones.json');

function getTimezone() {
    try {
        if (!fs.existsSync(userTimezonesPath)) {
            return null;
        }

        const data = JSON.parse(fs.readFileSync(userTimezonesPath, 'utf8'));
        return data.channelTimezone || null;
    } catch (error) {
        console.error('❌ Erreur lors de la lecture du fuseau horaire:', error);
        return null;
    }
}

module.exports = getTimezone;