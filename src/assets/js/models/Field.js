class Field {
  constructor(name, initialPosition, finalPosition, startingLine = null, endLine = null) {
    this.name = name;
    this.initialPosition = initialPosition;
    this.finalPosition = finalPosition;
    this.size = this.finalPosition - this.initialPosition;
    this.startingLine = startingLine;
    this.endLine = endLine;
  }

  toObject() {
    return {
      name: this.name,
      initialPosition: this.initialPosition,
      finalPosition: this.finalPosition,
      size: this.size,
      startingLine: this.startingLine,
      endLine: this.endLine,
    };
  }
}

module.exports = Field;
