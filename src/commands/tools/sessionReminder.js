const { SlashCommandBuilder } = require('discord.js');
const { getClosestEventByName, sendEventReminderMsg } = require('../../scripts/scheduledEventsUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('session-reminder')
    .setDescription('Remind everyone about the session.')
    .addStringOption((option) => 
        option.setName('eventname')
          .setDescription('Name of the event')
          .setRequired(true)),
  async execute(interaction, client) {
    const eventName = interaction.options.getString('eventname');
    const event = await getClosestEventByName(eventName);
    if (!event) return;
    const newMsg = await sendEventReminderMsg(client, event);

    if (newMsg) {
      await interaction.reply(newMsg);
    } else {
      await interaction.reply('_ _');
    }
  }
};
