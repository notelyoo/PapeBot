/**
  📁 File: listAnnouncements.js
  🧑‍💻 Developed by: Elyoo (NotElyoo)
  📬 Contact: contact@miyeon.fr
 */

  const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, MessageFlags } = require('discord.js');
  const createEmbed = require('../utils/createEmbed');
  
  const activeAnnouncements = new Map();
  
  module.exports = {
      name: 'liste-annonces',
      description: 'Lister les annonces périodiques actives et permettre leur désactivation.',
      run: async (interaction) => {
          if (activeAnnouncements.size === 0) {
              const embed = createEmbed('📭 Aucune annonce active', 'Il n’y a actuellement aucune annonce périodique active.', 0xFFA500);
              return interaction.reply({ embeds: [embed] });
          }
  
          const embed = createEmbed('📣 Annonces actives', 'Voici les annonces périodiques enregistrées :', 0x00AAFF);
          const row = new ActionRowBuilder();
  
          let i = 0;
          for (const [id, data] of activeAnnouncements.entries()) {
              embed.addFields({ name: `🗨️ Annonce #${i + 1}`, value: `**${data.message}**\n⏱️ Toutes les ${data.interval} minutes` });
              row.addComponents(
                  new ButtonBuilder()
                      .setCustomId(`stop_${id}`)
                      .setLabel(`🛑 Stop #${i + 1}`)
                      .setStyle(ButtonStyle.Danger)
              );
              i++;
          }
  
          await interaction.reply({ embeds: [embed], components: [row] });
  
          const sentMessage = await interaction.fetchReply();
          const collector = sentMessage.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });
  
          collector.on('collect', async (btnInteraction) => {
              const btnId = btnInteraction.customId;
              const targetId = btnId.replace('stop_', '');
  
              if (activeAnnouncements.has(targetId)) {
                  const data = activeAnnouncements.get(targetId);
                  if (data.intervalID) clearInterval(data.intervalID);
                  activeAnnouncements.delete(targetId);
                  console.log(`🛑 Annonce #${targetId} stoppée manuellement`);
                  await btnInteraction.reply({ content: `✅ Annonce désactivée.`, flags: MessageFlags.Ephemeral });
              } else {
                  await btnInteraction.reply({ content: `⚠️ Annonce introuvable ou déjà arrêtée.`, flags: MessageFlags.Ephemeral });
              }
          });
  
          collector.on('end', () => {
              sentMessage.edit({ components: [] });
          });
      },
      activeAnnouncements
  };  