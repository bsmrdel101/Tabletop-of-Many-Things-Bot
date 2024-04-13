const { readdirSync } = require('fs');

module.exports = (client) => {
  client.handleComponents = async () => {
    const componentFolders = readdirSync('./src/components');
    componentFolders.forEach((folder) => {
      const componentFiles = readdirSync(`./src/components/${folder}`).filter(
        (file) => file.endsWith('.js')
      );

      const { buttons, selectMenus } = client;

      switch (folder) {
        case 'buttons':
          componentFiles.forEach((file) => {
            const button = require(`../../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
          });
          break;
        case 'selectMenus':
          componentFiles.forEach((file) => {
            const menu = require(`../../components/${folder}/${file}`);
            selectMenus.set(menu.data.name, menu);
          });
          break;
        default:
          break;
      }
    });
  };
};
