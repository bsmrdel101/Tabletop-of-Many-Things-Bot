const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Return my ping!'),
  async execute(interaction, client) {
    const msg = await interaction.deferReply({
      fetchReply: true
    });

    const newMsg = `API Latency: ${client.ws.ping}\nClient Ping: ${msg.createdTimestamp - interaction.createdTimestamp}`;
    await interaction.editReply({
      content: newMsg
    });
  }
};
