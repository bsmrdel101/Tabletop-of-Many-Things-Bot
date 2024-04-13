const { SlashCommandBuilder } = require('discord.js');
const { getClosestEventByName, sendEventReminderMsg } = require('../../scripts/scheduledEventsUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('session-reminder')
    .setDescription('Remind everyone about the session.'),
  async execute(interaction, client) {
    await interaction.deferReply();
    const event = await getClosestEventByName('Evermoon');
    const newMsg = await sendEventReminderMsg(client, event);

    if (newMsg) {
      await interaction.editReply(newMsg);
    } else {
      await interaction.editReply('_ _');
    }
  }
};
