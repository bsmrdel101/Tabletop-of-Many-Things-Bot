const CronJob = require('cron').CronJob;
const { getEventsForDay, sendEventReminderMsg } = require('../../scripts/scheduledEventsUtils');

module.exports = (client) => {
  new CronJob('0 6 * * *', async function() {
    const events = await getEventsForDay(new Date());
    
    for (let i = 0; i < events.length; i++) {
      await sendEventReminderMsg(client, events[i]);
    }
  }, null, true, 'America/Chicago');
};
