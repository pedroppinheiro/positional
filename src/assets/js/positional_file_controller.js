const { ipcRenderer } = require('electron');
const fs = require('fs');

let positionalFileControler = null;

class PositionalFileController {
  constructor(filePath) {
    this.showFileContent(filePath);
    this.fileContent = null;
  }

  showFileContent(filePath) {
    const fileContentDiv = document.getElementById('file_content');
    fs.readFileSync(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(`An error ocurred reading the file: ${err.message}`);
        return;
      }

      this.fileContent = data;
      fileContentDiv.textContent = this.fileContent;
    });
  }
}

ipcRenderer.on('fileUpload', (event, data) => {
  positionalFileControler = new PositionalFileController(data[0]);
});
