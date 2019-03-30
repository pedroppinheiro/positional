import Field from '../models/Field';

export default class DemarkationService {
  /**
   * Receives a field object and based on its position and name, it marks on the text
   * as a span.
   * Field object example:
   *   field = {
   *     name: 'myField',
   *     initialPosition: 14,
   *     finalPosition: 17,
   *   }
   */
  static demarkFieldOnText(field: Field, text: string) {
    const finalPosition: number = field.initialPosition - 1 + field.size;

    const firstPart = text.substring(0, field.initialPosition - 1);
    const middlePart = text.substring(field.initialPosition - 1, finalPosition);
    const finalPart = text.substring(finalPosition, text.length);

    const stringTemplate = `${firstPart}` +
                           `<span class="${field.name}">${middlePart}</span>` +
                           `${finalPart}`;

    return stringTemplate;
  }
}
