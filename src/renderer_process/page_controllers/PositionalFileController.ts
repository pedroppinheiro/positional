import { ipcRenderer } from 'electron';
import * as fs from 'fs';
import MarkService from '../services/MarkService';
import Field from '../models/Field';
import * as es from 'event-stream';

class PositionalFileController {

  MAXIMUM_FILE_LINE = 500;
  CONTENT_HTML_ELEMENT = 'file_content';
  FILE_CONTAINER = 'file_container';
  // fileContent: string;
  filePath: string;
  contentHTMLElement: HTMLElement;
  mainContainerHTMLElement: HTMLElement;
  contentLineNumber: number;

  storedFields: Field[];

  constructor(filePath: string) {
    this.filePath = filePath;
    this.contentHTMLElement = document.getElementById(this.CONTENT_HTML_ELEMENT);
    this.mainContainerHTMLElement = document.getElementById(this.FILE_CONTAINER);
    this.readFileContent((line) => {
      const lineBreak = '\n';
      this.appendTextOnNode(`${line}${line ? lineBreak : ''}`, this.contentHTMLElement, false);
    });
    this.storedFields = [];
  }

  readFileContent(processText: (line: string) => void): void {
    this.clearLineNumbers();
    this.setTextOnNode('', this.contentHTMLElement);
    this.contentLineNumber = 0;

    const s = fs.createReadStream(this.filePath)
              .pipe(es.split())
              .pipe(es.mapSync((line: string) => {
      // pause the readstream
      s.pause();
      if (this.contentLineNumber  === this.MAXIMUM_FILE_LINE) {
        s.end();
      }
      processText(line);
      this.contentLineNumber  += 1;
      // resume the readstream, possibly from a callback
      s.resume();
    })
    .on('error', (err) => {
      console.log('Error while reading file.', err);
    })
    .on('end', () => {
      console.log('Successfully read the file.');
      this.createLineNumbers();
    }));
  }

  /**
   * Inspired by https://jsfiddle.net/q9tuoh4k/
   */
  createLineNumbers() {
    const pre = document.getElementsByTagName('pre')[0];
    let lineNum: Element;

    const span = document.createElement('span');
    span.setAttribute('class', 'line-number');
    pre.prepend(span);

    for (let i = 0; i < this.contentLineNumber; i = i + 1) {
      lineNum = pre.getElementsByClassName('line-number')[0];
      lineNum.innerHTML += `<span> ${(i + 1)} </span>`;
    }
  }

  clearLineNumbers() {
    const pre = document.getElementsByTagName('pre')[0];
    const lineNumbers = pre.getElementsByClassName('line-number')[0];
    if (lineNumbers) {
      lineNumbers.remove();
    }
  }

  setTextOnNode(text: string, node: HTMLElement, shouldEscapeText = true): void {
    if (shouldEscapeText) {
      node.textContent = text;
    } else {
      node.innerHTML = text;
    }
  }

  appendTextOnNode(text: string, node: HTMLElement, shouldEscapeText = true): void {
    if (shouldEscapeText) {
      node.textContent += text;
    } else {
      node.innerHTML += text;
    }
  }

  createField() {
    const formData = $('#newFieldForm').serializeArray();

    const field: Field = new Field(
      formData[0].value,
      parseInt(formData[1].value, 10),
      parseInt(formData[2].value, 10),
      formData[3].value,
    );

    this.storedFields.push(field);
    this.markFields(this.storedFields);
    ($('#newFieldModal') as any).modal('hide');
  }

  markFields(fields: Field[]) {
    this.readFileContent((line) => {
      let finalResult = '';
      // for (const field of fields) {
      finalResult = `${MarkService.markFieldsOnText(fields, line)}`;
      // }
      finalResult += '\n';
      this.appendTextOnNode(finalResult, this.contentHTMLElement, false);
    });
  }

  cleanModalFields() {
    (document.getElementById('newFieldForm') as HTMLFormElement).reset();
  }

  resetMainContainerFontSize() {
    this.mainContainerHTMLElement.style.fontSize = window
                                        .getComputedStyle(document.body)
                                        .getPropertyValue('--default-file-content-font-size');
  }

  increaseMainContainerFontSize() {
    this.addMainContainerFontSize(4);
  }

  decreaseMainContainerFontSize() {
    this.addMainContainerFontSize(-4);
  }

  addMainContainerFontSize(size: number) {
    const style = window.getComputedStyle(this.mainContainerHTMLElement, null)
                        .getPropertyValue('font-size');
    const currentSize = parseFloat(style);
    this.mainContainerHTMLElement.style.fontSize = `${(currentSize + size)}px`;
  }
}

ipcRenderer.on('fileUpload', (event: Electron.Event, data: any) => {
  (window as any).positionalFileControler = new PositionalFileController(data[0]);
});

ipcRenderer.on('resetZoomAction', (event: Electron.Event, data: any) => {
  (window as any).positionalFileControler.resetMainContainerFontSize();
});

ipcRenderer.on('zoomInAction', (event: Electron.Event, data: any) => {
  (window as any).positionalFileControler.increaseMainContainerFontSize();
});

ipcRenderer.on('zoomOutAction', (event: Electron.Event, data: any) => {
  (window as any).positionalFileControler.decreaseMainContainerFontSize();
});

ipcRenderer.on('addNewRuleAction', (event: Electron.Event, data: any) => {
  ($('#newFieldModal') as any).modal();
});

$('#positional_file_section').on('hidden.bs.modal', '#newFieldModal', (e) => {
  (window as any).positionalFileControler.cleanModalFields();
});
