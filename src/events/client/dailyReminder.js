const fetch = require('node-fetch');

module.exports = (client) => {
  tempFn();
  setInterval(async () => {
    const events = await getEventsForDay(new Date());

    events.forEach((event) => {
      const channel = client.channels.cache.get(event.channelId);
      if (channel) {
        channel.send(`Reminder: ${event.name} is happening today!`);
      }
    });
  }, 24 * 60 * 60 * 1000);
};

const tempFn = async () => {
  const events = await getEventsForDay(new Date());
  console.log(events);
};

const getEventsForDay = async (date) => {
  const res = await fetch(`https://discord.com/api/v9/guilds/${process.env.guildId}/scheduled-events`, {
    headers: { 'Authorization': `Bot ${process.env.token}` }
  });
  const events = await res.json();

  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

  return events.filter((event) => {
    const eventDate = new Date(event.scheduled_start_time);
    return eventDate >= start && eventDate < end;
  });
};
