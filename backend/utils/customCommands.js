/**
 * 📁 File: utils/customCommands.js
 * 🧑‍💻 Developed by: Elyoo (NotElyoo)
 * 📬 Contact: contact@miyeon.fr
 */

const fs = require('fs');
const path = require('path');

const commandsFilePath = path.join(__dirname, '..', 'customCommands.json');

function loadCommands() {
    try {
        if (!fs.existsSync(commandsFilePath)) {
            return {};
        }
        const data = JSON.parse(fs.readFileSync(commandsFilePath, 'utf8'));
        return data;
    } catch (error) {
        console.error('❌ Erreur lors du chargement des commandes personnalisées:', error);
        return {};
    }
}

function saveCommands(commands) {
    try {
        fs.writeFileSync(commandsFilePath, JSON.stringify(commands, null, 2), 'utf8');
    } catch (error) {
        console.error('❌ Erreur lors de la sauvegarde des commandes personnalisées:', error);
    }
}

function addCommand(name, response) {
    const commands = loadCommands();
    commands[name.toLowerCase()] = response;
    saveCommands(commands);
}

function deleteCommand(name) {
    const commands = loadCommands();
    delete commands[name.toLowerCase()];
    saveCommands(commands);
}

function getCommandResponse(name) {
    const commands = loadCommands();
    return commands[name.toLowerCase()] || null;
}

function listCommands() {
    return Object.keys(loadCommands());
}

module.exports = {
    loadCommands,
    saveCommands,
    addCommand,
    deleteCommand,
    getCommandResponse,
    listCommands
};