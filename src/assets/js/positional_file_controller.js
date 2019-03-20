const { ipcRenderer } = require('electron');
const fs = require('fs');
const DemarkationService = require('./services/demarkation_service');

let positionalFileControler = null;

class PositionalFileController {
  constructor(filePath) {
    this.fileContent = this.readFileContent(filePath);
    this.contentDivId = document.getElementById('file_content');
    this.renderTextOnNode(this.fileContent, this.contentDivId);
    this.teste();
  }

  readFileContent(filePath) {
    return fs.readFileSync(filePath, 'utf-8', (err) => {
      if (err) {
        console.error(`An error ocurred reading the file: ${err.message}`);
      }
    });
  }

  renderTextOnNode(text, node, shouldEscapeText = true) {
    if (shouldEscapeText) {
      node.textContent = text;
    } else {
      node.innerHTML = text;
    }
  }

  teste() {
    let finalResult = '';

    this.fileContent.split('\n').forEach((line) => {
      finalResult += DemarkationService.demarkFieldOnText({
        name: 'myField',
        initialPosition: 14,
        finalPosition: 17,
      }, line) + "\n";
    });

    this.renderTextOnNode(finalResult, this.contentDivId, false);
  }
}

ipcRenderer.on('fileUpload', (event, data) => {
  positionalFileControler = new PositionalFileController(data[0]);
});

ipcRenderer.on('resetZoomAction', (event, data) => {
  const fileContentNode = document.getElementById('file_content');
  fileContentNode.style.fontSize = window.getComputedStyle(document.body).getPropertyValue('--default-file-content-font-size');
});

ipcRenderer.on('zoomInAction', (event, data) => {
  const fileContentNode = document.getElementById('file_content');
  const style = window.getComputedStyle(fileContentNode, null).getPropertyValue('font-size');
  const currentSize = parseFloat(style);
  fileContentNode.style.fontSize = `${(currentSize + 4)}px`;
});

ipcRenderer.on('zoomOutAction', (event, data) => {
  const fileContentNode = document.getElementById('file_content');
  const style = window.getComputedStyle(fileContentNode, null).getPropertyValue('font-size');
  const currentSize = parseFloat(style);
  fileContentNode.style.fontSize = `${(currentSize - 4)}px`;
});
