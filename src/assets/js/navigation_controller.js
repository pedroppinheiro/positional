const { ipcRenderer } = require('electron');

class NavigationController {
  constructor() {
    this.constants = {
      sectionTemplate: '.section_template',
      contentContainer: '#content_container',
      startSection: '#welcome_page_section',
      // startSectionMenuItem: '#welcome-menu',
    };
    this.importSectionsToDOM();
    this.showStartSection();

    ipcRenderer.on('renderPage', (event, sectionId) => {
      this.handleMenuControllerActions(sectionId);
    });
  }

  importSectionsToDOM() {
    const links = document.querySelectorAll('link[rel="import"]');
    links.forEach((link) => {
      const template = link.import.querySelector(this.constants.sectionTemplate);
      const clone = document.importNode(template.content, true);
      document.querySelector(this.constants.contentContainer).appendChild(clone);
    });
  }

  showSection(sectionId) {
    this.hideAllSections();

    let section = null;
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
    sectionList.forEach((section) => {
      section.style.display = 'none';
    });
  }

  showStartSection() {
    this.showSection(this.constants.startSection);
    // $(this.constants.startSectionMenuItem).click();
    // $(this.constants.startSection).show();
    // $(this.constants.startSection + ' section').show();
  }

  handleMenuControllerActions(sectionId) {
    if (sectionId) {
      this.showSection(sectionId);
    }
  }
}

const navigationController = new NavigationController();
