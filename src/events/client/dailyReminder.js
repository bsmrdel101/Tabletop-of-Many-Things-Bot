const cron = require('node-cron');
const { getEventsForDay, sendEventReminderMsg } = require('../../scripts/scheduledEventsUtils');

module.exports = (client) => {
  cron.schedule('0 6 * * *', async () => {
    const events = await getEventsForDay(new Date());

    events.forEach((event) => {
      sendEventReminderMsg(client, event);
    });
  });
};
