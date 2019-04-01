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
  }

  readFileContent(filePath: string) {
    return fs.readFileSync(filePath, { encoding: 'utf-8' });
  }

  renderTextOnNode(text: string, node: HTMLElement, shouldEscapeText = true): void {
    if (shouldEscapeText) {
      node.textContent = text;
    } else {
      node.innerHTML = text;
    }
  }

  createField() {
    const formData = $('#newFieldForm').serializeArray();

    const field: Field = new Field(formData[0].value,
                                   parseInt(formData[1].value, 10),
                                   parseInt(formData[2].value, 10));
    this.demarkField(field);
    ($('#newFieldModal') as any).modal('hide');
  }

  demarkField(field: Field) {
    let finalResult = '';

    this.fileContent.split('\n').forEach((line) => {
      finalResult += `${DemarkationService.demarkFieldOnText(field, line)}\n`;
    });
    this.renderTextOnNode(finalResult, this.contentDivId, false);
  }

  cleanModalFields() {
    (document.getElementById('newFieldForm') as HTMLFormElement).reset();
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
  ($('#newFieldModal') as any).modal();
});

$('#positional_file_section').on('hidden.bs.modal', '#newFieldModal', (e) => {
  (window as any).positionalFileControler.cleanModalFields();
});
