import { ipcRenderer } from 'electron';
import * as fs from 'fs';
import DemarkationService from '../services/DemarkationService';
import Field from '../models/Field';

class PositionalFileController {

  fileContent: string;
  contentDivId: HTMLElement;

  constructor(filePath: string) {
    this.fileContent = this.readFileContent(filePath);
    this.contentDivId = document.getElementById('file_content');
    this.renderTextOnNode(this.fileContent, this.contentDivId);
    this.teste();
  }

  readFileContent(filePath: string) {
    return fs.readFileSync(filePath, { encoding: 'utf-8' });
  }

  renderTextOnNode(text: string, node: HTMLElement, shouldEscapeText = true) {
    if (shouldEscapeText) {
      node.textContent = text;
    } else {
      node.innerHTML = text;
    }
  }

  teste() {
    let finalResult = '';

    this.fileContent.split('\n').forEach((line) => {
      const newField: Field = new Field('myField', 14, 17);
      finalResult += `${DemarkationService.demarkFieldOnText(newField, line)}\n`;
    });

    this.renderTextOnNode(finalResult, this.contentDivId, false);
  }

  teste2() {
    alert('Funcionou!!!');
  }
}

ipcRenderer.on('fileUpload', (event: Electron.Event, data: any) => {
  (window as any).positionalFileControler = new PositionalFileController(data[0]);
});

ipcRenderer.on('resetZoomAction', (event: Electron.Event, data: any) => {
  const fileContentNode = document.getElementById('file_content');
  fileContentNode.style.fontSize = window.getComputedStyle(document.body)
                                         .getPropertyValue('--default-file-content-font-size');
});

ipcRenderer.on('zoomInAction', (event: Electron.Event, data: any) => {
  const fileContentNode = document.getElementById('file_content');
  const style = window.getComputedStyle(fileContentNode, null).getPropertyValue('font-size');
  const currentSize = parseFloat(style);
  fileContentNode.style.fontSize = `${(currentSize + 4)}px`;
});

ipcRenderer.on('zoomOutAction', (event: Electron.Event, data: any) => {
  const fileContentNode = document.getElementById('file_content');
  const style = window.getComputedStyle(fileContentNode, null).getPropertyValue('font-size');
  const currentSize = parseFloat(style);
  fileContentNode.style.fontSize = `${(currentSize - 4)}px`;
});

ipcRenderer.on('addNewRuleAction', (event: Electron.Event, data: any) => {
  ($('#exampleModal') as any).modal();
});
