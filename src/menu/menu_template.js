const { shell } = require('electron');

const createAboutPageWindow = require('../about_page/about_page_renderer');
// the menu template must be an array
const menuTemplate = [

  {
    label: 'File',
    submenu: [
      { label: 'Upload File' },
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
        click(menuItem, browserWindow) { createAboutPageWindow(browserWindow); },
      },
      {
        label: 'Github Page',
        click() { shell.openExternal('https://github.com/pedroppinheiro/positional'); },
      },
      {
        label: 'View README',
        click() { shell.openExternal('https://github.com/pedroppinheiro/positional/blob/master/README.md'); },
      },
    ],
  },
];

module.exports = menuTemplate;
