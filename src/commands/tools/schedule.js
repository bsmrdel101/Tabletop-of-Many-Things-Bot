const { SlashCommandBuilder, EmbedBuilder, time } = require('discord.js');
const { fetchSchedulesData } = require('../../controllers/scheduleController');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Shows everyone\'s availability'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle('Schedule')
      .setDescription('Here\'s the available times!')
      .setColor(0x4acfcc)
      .addFields(await displaySchedule());

      await interaction.reply({
        embeds: [embed]
      });
  }
};

// Returns all the schedule data to display
const displaySchedule = async () => {
  const userSchedules = await getSchedules();
  const schedule = determineAvailability(userSchedules);
  return schedule;
};

// Return list of avaiable times for each user
const getSchedules = async () => {
  const data = await fetchSchedulesData();
  return data;
};

// Returns the filtered and formated schedule data
const determineAvailability = (userSchedules) => {
  const schedule = [];
  let days = [{day: 'monday', users: ''}, {day: 'tuesday', users: ''}, {day: 'wednesday', users: ''}, {day: 'thursday', users: ''}, {day: 'friday', users: ''}, {day: 'saturday', users: ''}, {day: 'sunday', users: ''}];
  days = handleAvailableDays(days, userSchedules); // Filter available days

  days.forEach((day) => {
    schedule.push({ name: day.day, value: day.users });
  });

  handleAvailableTimes(userSchedules);
  return schedule;
};

const handleAvailableDays = (days, userSchedules) => {
  const freeDays = [];
  days.forEach((day) => {
    let isFree = true;
    let users = '';
    userSchedules.forEach((user) => {
      if (!user.days.includes(day.day)) {
        isFree = false;
      } else {
        // User text that will be displayed
        users += `- ${user.name} (${displayUserTimes(user.times, userSchedules)})\n`;
      }
    });
    if (isFree) freeDays.push({day: day.day, users: users});
  });
  return freeDays;
};

const displayUserTimes = (times, userSchedules) => {
  let timeText = '';
  times.forEach((time, i) => {
    if (true) {
      timeText += `${time.hour}:${numIsTwoDigits(time.min) ? 0 : ''}${time.min} ${time.meridiem}${addComma(times, i)}`;
    }
  });
  return timeText;
};

const handleAvailableTimes = (userSchedules) => {
  // const date = new Date(2002, 05, 12, time.hour, time.min);
  let earliestTime = { time: new Date(2002, 05, 12, 99, 99), meridiem: 'pm' };
  let latestTime = { time: new Date(2002, 05, 12, 0, 0), meridiem: 'am' };

  userSchedules.forEach((user) => {
    user.times.forEach((time) => {
      const date = new Date(2002, 05, 12, time.hour, time.min);
      // Get latest and earliest times
      if (date < earliestTime.time && time.meridiem === 'am' && earliestTime.meridiem === 'pm') {
        earliestTime.time = date;
        earliestTime.meridiem = time.meridiem;
      } else if (time.meridiem === 'am' && earliestTime.meridiem === 'pm') {
        earliestTime.time = date;
        earliestTime.meridiem = time.meridiem;
      }

      console.log(`${date.getHours()}:${date.getMinutes()} ${time.meridiem}, `, `${latestTime.time.getHours()}:${latestTime.time.getMinutes()} ${latestTime.meridiem}`);
      console.log('latest: ', date > latestTime.time && time.meridiem === 'pm' && latestTime.meridiem === 'am');
      console.log(time.meridiem === 'pm' && latestTime.meridiem === 'am');
      
      if (date > latestTime.time && time.meridiem === 'pm' && latestTime.meridiem === 'am') {
        latestTime.time = date;
        latestTime.meridiem = time.meridiem;
      } else if (time.meridiem === 'pm' && latestTime.meridiem === 'am') {
        latestTime.time = date;
        latestTime.meridiem = time.meridiem;
      }
    });
  });
  console.log(`Earliest time: ${earliestTime.time.getHours()}:${earliestTime.time.getMinutes()} ${earliestTime.meridiem}`);
  console.log(`Latest time: ${latestTime.time.getHours()}:${latestTime.time.getMinutes()} ${latestTime.meridiem}`);

  return true;
};



const numIsTwoDigits = (num) => {
  let str = num.toString();
  return str.length === 1 ? true : false;
};

// Takes in array and current iteration
// Returns comma and space if it's not the last item in the array
const addComma = (arr, i) => {
  return i+1 === arr.length ? '' : ', ';
};
