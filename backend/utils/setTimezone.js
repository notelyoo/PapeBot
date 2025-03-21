const fs = require('fs');
const path = require('path');

const userTimezonesPath = path.join(__dirname, '..', 'userTimezones.json');

function setTimezone(timezone) {
    try {
        let data = {};
        if (fs.existsSync(userTimezonesPath)) {
            data = JSON.parse(fs.readFileSync(userTimezonesPath, 'utf8'));
        }

        data.channelTimezone = timezone;

        fs.writeFileSync(userTimezonesPath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('❌ Erreur lors de la sauvegarde du fuseau horaire:', error);
        return false;
    }
}

module.exports = setTimezone;
