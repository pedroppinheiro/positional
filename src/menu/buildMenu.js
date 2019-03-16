const { Menu } = require('electron');
const menuTemplate = require('./menu_template.js');

function buildMenu() {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

module.exports = buildMenu;
