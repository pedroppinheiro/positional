const { BrowserWindow } = require('electron');

let aboutPageWindow;

function createAboutPageWindow(parentWindow) {
  aboutPageWindow = new BrowserWindow({
    width: 400,
    height: 350,
    parent: parentWindow,
    modal: true,
    show: false,
    movable: false,
    resizable: false,
    alwaysOnTop: true,
    frame: false,
  });

  aboutPageWindow.loadFile('src/about_page/about_page.html');

  aboutPageWindow.on('closed', () => {
    aboutPageWindow = null;
  });

  aboutPageWindow.once('ready-to-show', () => {
    aboutPageWindow.show();
  });
}

module.exports = createAboutPageWindow;
