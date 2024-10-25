const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

const sendEventReminderMsg = async (client, event) => {
  const sessionDate = new Date(event.scheduled_start_time);
  const time = sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'America/Chicago' });
  const embed = new EmbedBuilder()
    .setTitle('Reminder')
    .setDescription(`Session today at **${time}**`)
    .setColor(0xc858f5)
    .setThumbnail(`https://cdn.discordapp.com/guild-events/${event.id}/${event.image}`)
  const guild = client.guilds.cache.get(process.env.guildId);
  const channel = guild.channels.cache.find((channel) => channel.name.toLowerCase() === JSON.parse(event.description).channel.toLowerCase());
  const role = guild.roles.cache.find((r) => r.name.toLowerCase() === JSON.parse(event.description).role.toLowerCase());
  channel.send({ content: `${role}`, embeds: [embed] });
};

const getEventsForDay = async (date) => {
  const res = await fetch(`https://discord.com/api/v9/guilds/${process.env.guildId}/scheduled-events`, {
    headers: { 'Authorization': `Bot ${process.env.token}` }
  });
  const events = await res.json();
  
  return events.filter((event) => {
    const eventDate = new Date(event.scheduled_start_time);
    return eventDate.getMonth() === date.getMonth() && eventDate.getDate() === date.getDate();
  });
};

const getClosestEventByName = async (name) => {
  const res = await fetch(`https://discord.com/api/v9/guilds/${process.env.guildId}/scheduled-events`, {
    headers: { 'Authorization': `Bot ${process.env.token}` }
  });
  const events = await res.json();
  return events.find((event) => event.name.toLowerCase() === name.toLowerCase());
};

module.exports = {
  sendEventReminderMsg,
  getEventsForDay,
  getClosestEventByName
};
