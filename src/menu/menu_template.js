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
        accelerator: 'Control+o',
        click(menuItem, browserWindow) { menuController.uploadFileAction(browserWindow); },
      },
      { type: 'separator' },
      {
        id: 'addNewRuleMenuItemId',
        label: 'Add New Field',
        enabled: false,
        accelerator: 'Control+n',
        click(menuItem, browserWindow) { menuController.addNewRuleAction(browserWindow); },
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
      // { role: 'reload' },
      // { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      {
        id: 'resetZoomActionMenuItemId',
        label: 'Actual Size',
        accelerator: 'Control+0',
        enabled: false,
        click(menuItem, browserWindow) { menuController.resetZoomAction(browserWindow); },
      },
      {
        id: 'zoomInActionMenuItemId',
        label: 'Zoom In',
        accelerator: 'Control+Plus',
        enabled: false,
        click(menuItem, browserWindow) { menuController.zoomInAction(browserWindow); },
      },
      {
        id: 'zoomOutActionMenuItemId',
        label: 'Zoom Out',
        accelerator: 'Control+-',
        enabled: false,
        click(menuItem, browserWindow) { menuController.zoomOutAction(browserWindow); },
      },
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
