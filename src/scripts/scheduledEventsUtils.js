const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

const sendEventReminderMsg = async (client, event) => {
  const sessionDate = new Date(event.scheduled_start_time);
  const time = sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'America/Chicago' });
  const embed = new EmbedBuilder()
    .setTitle('Reminder')
    .setDescription(`Session ${sessionDate === new Date() ? 'today' : sessionDate.toLocaleDateString('en-US')} at **${time}**`)
    .setColor(0xc858f5)
    .setThumbnail('https://media.discordapp.net/attachments/1228786850232012921/1228808148844941392/Evermoon_new.jpg?ex=662d63c4&is=661aeec4&hm=f58e258356fda93e68ad7a74f234625a4fcf8f8ca921198f566cd26c28281d60&=&format=webp&width=901&height=676')
  const channel = client.channels.cache.find((channel) => channel.name === "evermoon");
  channel.send({ content: `<@&${event.name}>`, embeds: [embed] });
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
