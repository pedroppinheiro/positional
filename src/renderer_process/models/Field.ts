export default class Field {

  name :string;
  initialPosition: number;
  size: number;
  color: string;

  constructor(name: string, initialPosition: number, size: number, color:string = null) {
    this.name = name;
    this.initialPosition = initialPosition;
    this.size = size;
    this.color = color;
  }

  toObject() {
    return {
      name: this.name,
      initialPosition: this.initialPosition,
      size: this.size,
      color: this.color,
    };
  }
}
