const MenuActions = require('./menu_actions');
// the menu template must be an array
const menuTemplate = [

  {
    label: 'File',
    submenu: [
      {
        label: 'Upload File',
        click(menuItem, browserWindow) { MenuActions.uploadFileAction(browserWindow); },
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
        click(menuItem, browserWindow) { MenuActions.aboutAction(browserWindow); },
      },
      {
        label: 'Github Page',
        click() { MenuActions.githubPageAction(); },
      },
      {
        label: 'View README',
        click() { MenuActions.viewReadmeAction(); },
      },
    ],
  },
];

module.exports = menuTemplate;
