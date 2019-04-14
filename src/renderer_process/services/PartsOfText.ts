export default class PartsOfText {
  initialPart: string;
  middlePart: string;
  finalPart: string;

  constructor(initialPart?: string, middlePart?: string, finalPart?: string) {
    this.initialPart = initialPart ? initialPart : '';
    this.middlePart = middlePart ? middlePart : '';
    this.finalPart = finalPart ? finalPart : '';
  }

  toString() {
    return this.initialPart + this.middlePart + this.finalPart;
  }
}