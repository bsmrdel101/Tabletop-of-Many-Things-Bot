const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

const sendEventReminderMsg = async (client, event) => {
  const time = new Date(event.scheduled_start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const embed = new EmbedBuilder()
    .setTitle('Reminder')
    .setDescription(`Session today at **${time}**`)
    .setColor(0xc858f5)
    .setImage(client.user.displayAvatarURL())
  const channel = client.channels.cache.find((channel) => channel.name === "general");
  channel.send({ content: `@${event.name}`, embeds: [embed] });
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

const getClosestEventByName = async (name) => {
  const res = await fetch(`https://discord.com/api/v9/guilds/${process.env.guildId}/scheduled-events`, {
    headers: { 'Authorization': `Bot ${process.env.token}` }
  });
  const events = await res.json();
  return events.find((event) => event.name === name);
};

module.exports = {
  sendEventReminderMsg,
  getEventsForDay,
  getClosestEventByName
};
