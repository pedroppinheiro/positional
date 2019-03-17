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
    browserWindow.webContents.send('renderPage', 'positional_file_section');
    // console.log(dialog.showOpenDialog(browserWindow, { title: 'Título' }));
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
