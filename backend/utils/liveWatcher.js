/**
  📁 File: liveWatcher.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sendMessage = require('./sendMessage');
const { activeAnnouncements } = require('../commands/listAnnouncements');
const { EmbedBuilder } = require('discord.js');

const configPath = path.join(__dirname, '..', 'config.json');
let liveStatus = false;

async function checkLiveStatus(discordClient) {
    try {
        const response = await axios.get('https://api.twitch.tv/helix/streams', {
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`
            },
            params: {
                user_login: process.env.TWITCH_CHANNEL
            }
        });

        const stream = response.data.data?.[0];
        const currentlyLive = !!stream;

        if (currentlyLive && !liveStatus) {
            console.log('📡 Le live vient de commencer');

            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            const announceChannelId = config.discordAnnounceChannelId;

            if (announceChannelId) {
                const channel = await discordClient.channels.fetch(announceChannelId);
                if (channel) {
                    const userInfo = await axios.get('https://api.twitch.tv/helix/users', {
                        headers: {
                            'Client-ID': process.env.TWITCH_CLIENT_ID,
                            'Authorization': `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`
                        },
                        params: {
                            login: process.env.TWITCH_CHANNEL
                        }
                    });
                    const user = userInfo.data.data[0];

                    const streamTitle = stream.title;
                    const gameName = stream.game_name;
                    const thumbnailUrl = stream.thumbnail_url
                        .replace('{width}', '640')
                        .replace('{height}', '360') + `?rand=${Date.now()}`;

                    const embed = new EmbedBuilder()
                        .setColor(0x9146FF)
                        .setAuthor({
                            name: `${user.display_name} est en live sur Twitch !`,
                            iconURL: user.profile_image_url,
                            url: `https://twitch.tv/${user.login}`
                        })
                        .setTitle(streamTitle)
                        .setURL(`https://twitch.tv/${user.login}`)
                        .setDescription(`🎮 **Jeu :** ${gameName}`)
                        .setImage(thumbnailUrl)
                        .setTimestamp();

                    await channel.send({ embeds: [embed] });
                }
            }

            await sendMessage(process.env.TWITCH_CHANNEL, `🎉 Le live vient de commencer. Bienvenue à tous !`);

            for (const [id, data] of activeAnnouncements.entries()) {
                if (!data.active) {
                    const intervalID = setInterval(() => {
                        sendMessage(process.env.TWITCH_CHANNEL, data.message);
                    }, data.interval * 60 * 1000);

                    data.intervalID = intervalID;
                    data.active = true;
                    console.log(`🔁 Annonce #${id} activée`);
                }
            }
        }

        if (!currentlyLive && liveStatus) {
            console.log('📴 Le live est terminé');

            await sendMessage(process.env.TWITCH_CHANNEL, `📴 Le live est terminé. Merci d’avoir été présents 💜`);

            for (const [id, data] of activeAnnouncements.entries()) {
                if (data.active && data.intervalID) {
                    clearInterval(data.intervalID);
                    data.active = false;
                    data.intervalID = null;
                    console.log(`🛑 Annonce #${id} désactivée`);
                }
            }
        }

        liveStatus = currentlyLive;
    } catch (error) {
        console.error('❌ Erreur statut du live :', error.response?.data || error.message);
    }
}

function startLiveWatcher(discordClient) {
    console.log('⏱️ Surveillance du live activée (30s)');
    setInterval(() => checkLiveStatus(discordClient), 30 * 1000);
}

function isLive() {
    return liveStatus;
}

module.exports = { startLiveWatcher, isLive };