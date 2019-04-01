import { shell, dialog, Menu, BrowserWindow } from 'electron';
import AboutController from '../about_window/AboutController';

export default class MenuController {

  aboutController: AboutController;

  constructor() {
    this.aboutController = new AboutController();
  }

  welcomePageAction(browserWindow: BrowserWindow) {
    browserWindow.webContents.send('renderPage', 'welcome_page_section');
    Menu.getApplicationMenu().getMenuItemById('resetZoomActionMenuItemId').enabled = false;
    Menu.getApplicationMenu().getMenuItemById('zoomInActionMenuItemId').enabled = false;
    Menu.getApplicationMenu().getMenuItemById('zoomOutActionMenuItemId').enabled = false;
    Menu.getApplicationMenu().getMenuItemById('addNewRuleMenuItemId').enabled = false;
  }

  uploadFileAction(browserWindow: BrowserWindow) {
    const filePath = dialog.showOpenDialog(browserWindow, { title: 'Select a positional file' });
    if (filePath) {
      browserWindow.webContents.send('renderPage', 'positional_file_section');
      browserWindow.webContents.send('fileUpload', filePath);
      Menu.getApplicationMenu().getMenuItemById('resetZoomActionMenuItemId').enabled = true;
      Menu.getApplicationMenu().getMenuItemById('zoomInActionMenuItemId').enabled = true;
      Menu.getApplicationMenu().getMenuItemById('zoomOutActionMenuItemId').enabled = true;
      Menu.getApplicationMenu().getMenuItemById('addNewRuleMenuItemId').enabled = true;
    }
  }

  addNewRuleAction(browserWindow: BrowserWindow) {
    browserWindow.webContents.send('addNewRuleAction');
    console.log('addNewRuleAction');
  }

  aboutAction(browserWindow: BrowserWindow) {
    this.aboutController.renderAboutPage(browserWindow);
  }

  githubPageAction() {
    shell.openExternal('https://github.com/pedroppinheiro/positional');
  }

  viewReadmeAction() {
    shell.openExternal('https://github.com/pedroppinheiro/positional/blob/master/README.md');
  }

  resetZoomAction(browserWindow: BrowserWindow) {
    browserWindow.webContents.send('resetZoomAction');
    console.log('resetZoomAction');
  }

  zoomInAction(browserWindow: BrowserWindow) {
    browserWindow.webContents.send('zoomInAction');
    console.log('zoomInAction');
  }

  zoomOutAction(browserWindow: BrowserWindow) {
    browserWindow.webContents.send('zoomOutAction');
    console.log('zoomOutAction');
  }
}
