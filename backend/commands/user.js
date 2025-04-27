/**
  📁 File: user.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

const axios = require('axios');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const getUserIdFromTwitch = require('../utils/getUserIdFromTwitch');
const createEmbed = require('../utils/createEmbed');
const banUser = require('../utils/banUser');
const timeoutUser = require('../utils/timeoutUser');
const unbanUser = require('../utils/unbanUser');

module.exports = {
    name: "user",
    description: "Récupérer les informations d'un utilisateur Twitch.",
    options: [
        {
            name: 'pseudo',
            type: 'STRING',
            description: 'Le pseudonyme de l\'utilisateur',
            required: true
        }
    ],
    run: async (interaction) => {
        const pseudo = interaction.options.getString('pseudo');
        try {
            const userResponse = await axios.get(`https://api.twitch.tv/helix/users?login=${pseudo}`, {
                headers: {
                    'Client-ID': process.env.TWITCH_CLIENT_ID,
                    'Authorization': `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`
                }
            });
            const users = userResponse.data.data;
            if (!users || users.length === 0) {
                return createEmbed('⚠️ Erreur', `Utilisateur **${pseudo}** non trouvé.`, 0xFF0000);
            }
            const twitchUser = users[0];
            const broadcasterId = await getUserIdFromTwitch(process.env.TWITCH_CHANNEL);

            let isBanned = false;
            try {
                const banResponse = await axios.get('https://api.twitch.tv/helix/moderation/banned', {
                    params: {
                        broadcaster_id: broadcasterId,
                        user_id: twitchUser.id
                    },
                    headers: {
                        'Client-ID': process.env.TWITCH_CLIENT_ID,
                        'Authorization': `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`
                    }
                });
                if (banResponse.data.data && banResponse.data.data.length > 0) {
                    isBanned = true;
                }
            } catch (banError) {
                console.error("Erreur lors de la vérification du bannissement :", banError.response?.data || banError.message);
            }

            const embedColor = isBanned ? 0xFF0000 : 0x00FF00;
            const createdDate = new Date(twitchUser.created_at).toLocaleDateString("fr-FR");

            const embed = {
                color: embedColor,
                author: {
                    name: twitchUser.display_name,
                    url: `https://www.twitch.tv/${twitchUser.login}`,
                    icon_url: twitchUser.profile_image_url
                },
                title: `${twitchUser.display_name} - Profil Twitch`,
                thumbnail: {
                    url: twitchUser.profile_image_url
                },
                fields: [
                    { name: "🔹 Nom d'affichage", value: twitchUser.display_name, inline: true },
                    { name: "👤 Nom d'utilisateur", value: twitchUser.login, inline: true },
                    { name: "⚡ Statut", value: twitchUser.broadcaster_type ? "En ligne" : "Hors ligne", inline: true },
            
                    { name: "🌍 Langue", value: twitchUser.language || "Non spécifiée", inline: true },
                    { name: "📅 Créé le", value: createdDate, inline: true },
                    { name: "🆔 ID utilisateur", value: twitchUser.id, inline: true },
            
                    { name: "💬 Description", value: twitchUser.description || "Aucune description", inline: false }
                ]
            };            

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('ban').setLabel('Ban').setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId('timeout').setLabel('Timeout').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('unban').setLabel('Unban').setStyle(ButtonStyle.Success)
            );

            await interaction.reply({ embeds: [embed], components: [row] });
            const sentMessage = await interaction.fetchReply();

            const collector = sentMessage.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

            collector.on('collect', async (i) => {
                if (i.user.id !== interaction.user.id) {
                    await i.reply({ content: 'Vous ne pouvez pas utiliser ce bouton.', ephemeral: true });
                    return;
                }
                if (i.customId === 'ban') {
                    try {
                        await banUser(process.env.TWITCH_CHANNEL, twitchUser.login, `Banni via commande Discord par ${i.user.username}`);
                        await i.reply({ content: `Utilisateur **${twitchUser.login}** a été banni.`, ephemeral: true });
                    } catch (err) {
                        console.error("Erreur lors du bannissement :", err);
                        await i.reply({ content: `Erreur lors du bannissement de **${twitchUser.login}**.`, ephemeral: true });
                    }
                } else if (i.customId === 'timeout') {
                    try {
                        await timeoutUser(process.env.TWITCH_CHANNEL, twitchUser.login, 1209600, `Timeout via commande Discord par ${i.user.username}`);
                        await i.reply({ content: `Utilisateur **${twitchUser.login}** a été timeout pendant 2 semaines.`, ephemeral: true });
                    } catch (err) {
                        console.error("Erreur lors du timeout :", err);
                        await i.reply({ content: `Erreur lors du timeout de **${twitchUser.login}**.`, ephemeral: true });
                    }
                } else if (i.customId === 'unban') {
                    try {
                        await unbanUser(process.env.TWITCH_CHANNEL, twitchUser.login);
                        await i.reply({ content: `Utilisateur **${twitchUser.login}** a été débanni.`, ephemeral: true });
                    } catch (err) {
                        console.error("Erreur lors du déban :", err);
                        await i.reply({ content: `Erreur lors du déban de **${twitchUser.login}**.`, ephemeral: true });
                    }
                }
            });

            collector.on('end', async () => {
                await interaction.editReply({ components: [] });
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des informations de l'utilisateur :", error.response?.data || error.message);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply(createEmbed('⚠️ Erreur', `Impossible de récupérer les informations pour **${pseudo}**.`, 0xFF0000));
            } else {
                await interaction.followUp({ embeds: [createEmbed('⚠️ Erreur', `Impossible de récupérer les informations pour **${pseudo}**.`, 0xFF0000)], ephemeral: true });
            }
        }
    }
};