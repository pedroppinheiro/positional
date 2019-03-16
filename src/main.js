// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron'); // https://electronjs.org/docs/api/remote

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.loadFile('src/index.html');

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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {

});

// function executeJavaScript(script) {
//   mainWindow.webContents.executeJavaScript(script)
// }

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const buildMenu = require('./menu/buildMenu.js');

buildMenu();
