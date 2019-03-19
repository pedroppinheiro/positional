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
