import Field from '../models/Field';

export default class DemarkationService {
  /**
   * Receives a field object and based on its position and name, it marks on the text
   * as a span.
   */
  static demarkFieldOnText(field: Field, text: string) {
    const finalPosition: number = field.initialPosition - 1 + field.size;

    const middlePart = text.substring(field.initialPosition - 1, finalPosition);

    const isMiddlePartEmpty = middlePart.length === 0;
    if (isMiddlePartEmpty) {
      return text;
    }

    const firstPart = text.substring(0, field.initialPosition - 1);
    const finalPart = text.substring(finalPosition, text.length);

    const classAttribute = `class="${field.name}"`;
    const colorStyleAttribute = `style="color: ${field.color}"`;

    const stringTemplate = `${firstPart}` +
                           `<span ${classAttribute} ${colorStyleAttribute}>${middlePart}</span>` +
                           `${finalPart}`;

    return stringTemplate;
  }
}
