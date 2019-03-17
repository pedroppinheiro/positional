const { BrowserWindow } = require('electron');

class AboutPageController {
  constructor(parentWindow) {
    this.aboutPageWindowOptions = {
      width: 400,
      height: 350,
      parent: parentWindow,
      modal: true,
      show: false,
      movable: false,
      resizable: false,
      alwaysOnTop: true,
      frame: false,
    };
  }

  renderAboutPage() {
    this.aboutPageWindow = new BrowserWindow(this.aboutPageWindowOptions);
    this.aboutPageWindow.loadFile('src/about_page/about_page.html');

    this.aboutPageWindow.on('closed', () => {
      this.aboutPageWindow = null;
    });

    this.aboutPageWindow.once('ready-to-show', () => {
      this.aboutPageWindow.show();
    });
  }
}

module.exports = AboutPageController;
