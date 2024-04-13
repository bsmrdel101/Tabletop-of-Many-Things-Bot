const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('dotenv').config();
const { token, clientId, guildId } = process.env;

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync('./src/commands');
    commandFolders.forEach((folder) => {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith('.js'));

      const { commands, commandArray } = client;
      commandFiles.forEach((file) => {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      });
    });

    const rest = new REST({ version: '9' }).setToken(token);
    try {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
