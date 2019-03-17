const { shell } = require('electron');
const { dialog } = require('electron');
const createAboutPageWindow = require('../about_page/about_page_renderer');

class MenuActions {
  static uploadFileAction(browserWindow) {
    console.log(dialog.showOpenDialog(browserWindow, { title: 'Título' }));
  }

  static aboutAction(browserWindow) {
    createAboutPageWindow(browserWindow);
  }

  static githubPageAction() {
    shell.openExternal('https://github.com/pedroppinheiro/positional');
  }

  static viewReadmeAction() {
    shell.openExternal('https://github.com/pedroppinheiro/positional/blob/master/README.md');
  }
}

module.exports = MenuActions;
