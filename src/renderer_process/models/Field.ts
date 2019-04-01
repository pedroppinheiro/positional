export default class Field {

  name :string;
  initialPosition: number;
  size: number;

  constructor(name: string, initialPosition: number, size: number) {
    this.name = name;
    this.initialPosition = initialPosition;
    this.size = size;
  }

  toObject() {
    return {
      name: this.name,
      initialPosition: this.initialPosition,
      size: this.size,
    };
  }
}
