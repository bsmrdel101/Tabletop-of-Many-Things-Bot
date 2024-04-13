const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Return an embed.'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle('This is an embed')
      .setDescription('Cool description.')
      .setColor(0x4acfcc)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: `https://github.com/bsmrdel101/discord-schedule-bot`,
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag
      })
      .setURL(`https://discord.com/developers/applications/1046530687466995873/oauth2/general`)
      .addFields([
        {
            name: 'name 1',
            value: 'value 1',
            inline: true,
        },
        {
            name: 'name 2',
            value: 'value 2',
            inline: true,
        },
      ]);

      await interaction.reply({
        embeds: [embed]
      });
  }
};
