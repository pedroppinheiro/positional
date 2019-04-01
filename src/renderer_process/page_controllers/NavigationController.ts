/**
 * This controller runs on the renderer process.
 * Its logic was based on the code presented in this tutorial:
 *     https://www.christianengvall.se/electron-app-navigation/
 */
import { ipcRenderer } from 'electron';

interface NavigationConstants {
  sectionTemplate: string;
  contentContainer: string;
  startSection: string;
}

export default class NavigationController {
  constants: NavigationConstants;

  constructor() {
    this.constants = {
      sectionTemplate: '.section_template',
      contentContainer: '#content_container',
      startSection: '#welcome_page_section',
    };
    this.importSectionsToDOM();
    this.showStartSection();

    ipcRenderer.on('renderPage', (event: Electron.Event, sectionId: string) => {
      this.showSection(sectionId);
    });
  }

  importSectionsToDOM() {
    const links = document.querySelectorAll('link[rel="import"]');
    links.forEach((link) => {
      const template = (link as any).import.querySelector(this.constants.sectionTemplate);
      const clone = document.importNode(template.content, true);
      document.querySelector(this.constants.contentContainer).appendChild(clone);
    });
  }

  showSection(sectionId: string) {
    if (!sectionId) {
      console.error('No sectionId defined');
      return;
    }

    this.hideAllSections();

    let section: HTMLElement = null;
    if (sectionId.startsWith('#')) {
      section = document.querySelector(sectionId);
    } else {
      section = document.getElementById(sectionId);
    }

    if (!section) {
      console.error(`Could not find section "${sectionId}"`);
    } else {
      section.style.display = '';
    }
  }

  hideAllSections() {
    const sectionList = document.querySelectorAll(`${this.constants.contentContainer} section`);
    sectionList.forEach((section: HTMLElement) => {
      section.style.display = 'none';
    });
  }

  showStartSection() {
    this.showSection(this.constants.startSection);
  }
}

(window as any).navigationController = new NavigationController();
