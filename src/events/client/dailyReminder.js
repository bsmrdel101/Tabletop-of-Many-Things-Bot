const { getEventsForDay, sendEventReminderMsg } = require('../../scripts/scheduledEventsUtils');


module.exports = (client) => {
  setInterval(async () => {
    const events = await getEventsForDay(new Date());

    events.forEach((event) => {
      sendEventReminderMsg(client, event);
    });
  }, 24 * 60 * 60 * 1000);
};
