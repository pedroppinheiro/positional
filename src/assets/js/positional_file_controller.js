const { ipcRenderer } = require('electron');
const fs = require('fs');

let positionalFileControler = null;

class PositionalFileController {
  constructor(filePath) {
    this.showFileContent(filePath);
  }

  showFileContent(filePath) {
    const fileContentDiv = document.getElementById('file_content');
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(`An error ocurred reading the file: ${err.message}`);
        return;
      }

      fileContentDiv.textContent = data;
    });
  }
}

ipcRenderer.on('fileUpload', (event, data) => {
  positionalFileControler = new PositionalFileController(data[0]);
});
