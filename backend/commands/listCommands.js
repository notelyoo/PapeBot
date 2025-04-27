/**
 * 📁 File: commands/listCommands.js
 * 🧑‍💻 Developed by: Elyoo (NotElyoo)
 * 📬 Contact: contact@miyeon.fr
 */

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, MessageFlags } = require('discord.js');
const createEmbed = require('../utils/createEmbed');
const { loadCommands, deleteCommand } = require('../utils/customCommands');

module.exports = {
    name: 'liste-commandes',
    description: 'Lister toutes les commandes personnalisées et permettre leur suppression.',
    run: async (interaction) => {
        const commandsData = loadCommands();
        const commandes = Object.keys(commandsData);

        if (commandes.length === 0) {
            const embed = createEmbed('📭 Aucune commande', 'Il n\'y a actuellement aucune commande personnalisée.', 0xFFA500);
            return interaction.reply({ embeds: [embed] });
        }

        const embed = createEmbed('📜 Commandes personnalisées', 'Voici la liste des commandes enregistrées :', 0x00AAFF);
        const row = new ActionRowBuilder();

        commandes.forEach((nom, index) => {
            embed.addFields({
                name: `#${index + 1} - !${nom}`,
                value: `**Réponse :**\n${commandsData[nom]}`,
            });
        
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId(`delete_${nom}`)
                    .setLabel(`🗑️ Supprimer !${nom}`)
                    .setStyle(ButtonStyle.Danger)
            );
        });        

        await interaction.reply({ embeds: [embed], components: [row] });

        const sentMessage = await interaction.fetchReply();
        const collector = sentMessage.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

        collector.on('collect', async (btnInteraction) => {
            const btnId = btnInteraction.customId;
            const nomCommande = btnId.replace('delete_', '');

            deleteCommand(nomCommande);

            await btnInteraction.reply({ content: `✅ Commande **!${nomCommande}** supprimée.`, flags: MessageFlags.Ephemeral });
        });

        collector.on('end', () => {
            sentMessage.edit({ components: [] });
        });
    }
};