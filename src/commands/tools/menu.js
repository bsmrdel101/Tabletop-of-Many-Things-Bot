const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('menu')
    .setDescription('Return a select menu.'),
  async execute(interaction, client) {
    const menu = new SelectMenuBuilder()
      .setCustomId('example-menu')
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(new SelectMenuOptionBuilder({
        label: 'Option 1',
        value: 'https://github.com/bsmrdel101/discord-schedule-bot',
      }), new SelectMenuOptionBuilder({
        label: 'Option 2',
        value: 'https://discord.com/developers/applications/1046530687466995873/oauth2/general',
      }));

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)]
    });
  }
};
