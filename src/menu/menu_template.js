const MenuController = require('./menu_controller');

const menuController = new MenuController();
// the menu template must be an array
const menuTemplate = [

  {
    label: 'File',
    submenu: [
      {
        label: 'Welcome page',
        click(menuItem, browserWindow) { menuController.welcomePageAction(browserWindow); },
      },
      { type: 'separator' },
      {
        label: 'Upload File',
        click(menuItem, browserWindow) { menuController.uploadFileAction(browserWindow); },
      },
      { type: 'separator' },
      { role: 'quit' },
    ],
  },

  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'delete' },
      { type: 'separator' },
      { role: 'selectall' },
    ],
  },

  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },

  {
    role: 'help',
    submenu: [
      {
        label: 'About',
        click(menuItem, browserWindow) { menuController.aboutAction(browserWindow); },
      },
      {
        label: 'Github Page',
        click() { menuController.githubPageAction(); },
      },
      {
        label: 'View README',
        click() { menuController.viewReadmeAction(); },
      },
    ],
  },
];

module.exports = menuTemplate;
