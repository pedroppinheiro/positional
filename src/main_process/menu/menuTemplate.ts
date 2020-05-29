import { BrowserWindow, MenuItem, MenuItemConstructorOptions } from 'electron';
import MenuController from './MenuController';

const menuController = new MenuController();
// the menu template must be an array
const menuTemplate: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Welcome page',
        click(menuItem: MenuItem, browserWindow: BrowserWindow) {
          menuController.welcomePageAction(browserWindow);
        },
      },
      { type: 'separator' },
      {
        label: 'Upload File',
        accelerator: 'Control+o',
        click(menuItem: MenuItem, browserWindow: BrowserWindow) {
          menuController.uploadFileAction(browserWindow);
        },
      },
      { type: 'separator' },
      {
        id: 'addNewRuleMenuItemId',
        label: 'Add New Field',
        enabled: false,
        accelerator: 'Control+n',
        click(menuItem: MenuItem, browserWindow: BrowserWindow) {
          menuController.addNewRuleAction(browserWindow);
        },
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
      { role: 'selectAll' },
    ],
  },

  {
    label: 'View',
    submenu: [
      { role: 'toggleDevTools' },
      { type: 'separator' },
      {
        id: 'resetZoomActionMenuItemId',
        label: 'Actual Size',
        accelerator: 'Control+0',
        enabled: false,
        click(menuItem: MenuItem, browserWindow: BrowserWindow) {
          menuController.resetZoomAction(browserWindow);
        },
      },
      {
        id: 'zoomInActionMenuItemId',
        label: 'Zoom In',
        accelerator: 'Control+Plus',
        enabled: false,
        click(menuItem: MenuItem, browserWindow: BrowserWindow) {
          menuController.zoomInAction(browserWindow);
        },
      },
      {
        id: 'zoomOutActionMenuItemId',
        label: 'Zoom Out',
        accelerator: 'Control+-',
        enabled: false,
        click(menuItem: MenuItem, browserWindow: BrowserWindow) {
          menuController.zoomOutAction(browserWindow);
        },
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
        click(menuItem: MenuItem, browserWindow: BrowserWindow) {
          menuController.aboutAction(browserWindow);
        },
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

export default menuTemplate;
