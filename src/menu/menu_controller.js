const { shell, dialog, Menu } = require('electron');
const AboutPageController = require('../about_page/about_page_controller');

class MenuController {
  constructor() {
    this.aboutPageController = new AboutPageController();
  }

  welcomePageAction(browserWindow) {
    browserWindow.webContents.send('renderPage', 'welcome_page_section');
    Menu.getApplicationMenu().getMenuItemById('resetZoomActionMenuItemId').enabled = false;
    Menu.getApplicationMenu().getMenuItemById('zoomInActionMenuItemId').enabled = false;
    Menu.getApplicationMenu().getMenuItemById('zoomOutActionMenuItemId').enabled = false;
  }

  uploadFileAction(browserWindow) {
    const filePath = dialog.showOpenDialog(browserWindow, { title: 'Select a positional file' });
    if (filePath) {
      browserWindow.webContents.send('renderPage', 'positional_file_section');
      browserWindow.webContents.send('fileUpload', filePath);
      Menu.getApplicationMenu().getMenuItemById('resetZoomActionMenuItemId').enabled = true;
      Menu.getApplicationMenu().getMenuItemById('zoomInActionMenuItemId').enabled = true;
      Menu.getApplicationMenu().getMenuItemById('zoomOutActionMenuItemId').enabled = true;
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

  resetZoomAction(browserWindow) {
    browserWindow.webContents.send('resetZoomAction');
    console.log('resetZoomAction');
  }

  zoomInAction(browserWindow) {
    browserWindow.webContents.send('zoomInAction');
    console.log('zoomInAction');
  }

  zoomOutAction(browserWindow) {
    browserWindow.webContents.send('zoomOutAction');
    console.log('zoomOutAction');
  }
}

module.exports = MenuController;
