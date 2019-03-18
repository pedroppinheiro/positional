const { shell } = require('electron');
const { dialog } = require('electron');
const AboutPageController = require('../about_page/about_page_controller');

class MenuController {
  constructor() {
    this.aboutPageController = new AboutPageController();
  }

  welcomePageAction(browserWindow) {
    browserWindow.webContents.send('renderPage', 'welcome_page_section');
  }

  uploadFileAction(browserWindow) {
    const filePath = dialog.showOpenDialog(browserWindow, { title: 'Select a positional file' });
    if (filePath) {
      browserWindow.webContents.send('renderPage', 'positional_file_section');
      browserWindow.webContents.send('fileUpload', filePath);
    }
  }

  aboutAction(browserWindow) {
    this.aboutPageController.renderAboutPage(browserWindow);
  }

  githubPageAction() {
    shell.openExternal('https://github.com/pedroppinheiro/positional');
  }

  viewReadmeAction() {
    shell.openExternal('https://github.com/pedroppinheiro/positional/blob/master/README.md');
  }
}

module.exports = MenuController;
