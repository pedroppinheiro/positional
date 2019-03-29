import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import * as path from 'path';

export default class AboutController {
  aboutPageWindowOptions: BrowserWindowConstructorOptions;
  aboutPageWindow: BrowserWindow;

  constructor() {
    this.aboutPageWindowOptions = {
      width: 400,
      height: 350,
      parent: null,
      modal: true,
      show: false,
      movable: false,
      resizable: false,
      alwaysOnTop: true,
      frame: false,
    };
  }

  renderAboutPage(browserWindow: BrowserWindow) {
    this.aboutPageWindowOptions.parent = browserWindow;
    this.aboutPageWindow = new BrowserWindow(this.aboutPageWindowOptions);
    this.aboutPageWindow.loadFile(
        path.join(__dirname, '../../renderer_process/pages/about_page.html'),
    );

    this.aboutPageWindow.on('closed', () => {
      this.aboutPageWindow = null;
    });

    this.aboutPageWindow.once('ready-to-show', () => {
      this.aboutPageWindow.show();
    });
  }
}
