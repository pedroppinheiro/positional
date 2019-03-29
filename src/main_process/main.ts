import { app, BrowserWindow, MenuItemConstructorOptions, Menu } from 'electron';
import menuTemplate from './menu/menuTemplate';
import * as path from 'path';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 650,
    webPreferences: {
      nodeIntegration: true,
    },
    width: 1024,
  });

  // file:///home/pedro/Documentos/positional/dist/renderer_process/pages/index.html

  // mainWindow.loadURL(`file://${__dirname}/main.html`);
  // mainWindow.loadFile(require('../renderer_process/pages/index.html'));

  mainWindow.loadFile(path.join(__dirname, '../renderer_process/pages/index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function buildMenu(template: MenuItemConstructorOptions[]) {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

buildMenu(menuTemplate);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});
