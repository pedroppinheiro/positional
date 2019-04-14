import Field from '../models/Field';
import PartsOfText from './PartsOfText';

export default class MarkService {

  static markFieldOnText(field: Field, text: string): string {
    const fields: Field[] = [];
    fields.push(field);
    return MarkService.markFieldsOnText(fields, text);

    // const partsOfText = MarkService.extractPartsOfText(field, text);
    // const partsOfTextWithMiddlePartMarked = MarkService.addMarkToMiddlePart(field, partsOfText);
    // return partsOfTextWithMiddlePartMarked.toString();
  }

  static markFieldsOnText(fields: Field[], text: string): string {

    let finalText = '';
    MarkService.sortFieldsByInitialPositionAsc(fields);
    let initialPositionModifier = 0;
    let partsOfText: PartsOfText = null;
    let partsOfTextWithMiddlePartMarked: PartsOfText = null;
    for (const field of fields) {
      partsOfText = MarkService.extractPartsOfText(field, text, initialPositionModifier);

      initialPositionModifier += (partsOfText.initialPart +
                                 partsOfText.middlePart).length;

      partsOfTextWithMiddlePartMarked = MarkService.addMarkToMiddlePart(field, partsOfText);
      finalText += partsOfTextWithMiddlePartMarked.initialPart +
                   partsOfTextWithMiddlePartMarked.middlePart;

      text = partsOfTextWithMiddlePartMarked.finalPart;
    }
    finalText += partsOfTextWithMiddlePartMarked.finalPart;
    return finalText;
  }

  /**
   * Receives a field object and based on its position and name, it marks on the text
   * as a span.
   */
  private static extractPartsOfText(field: Field, text: string,
                                    initialPositionModifier?: number): PartsOfText {

    const initialPosition = initialPositionModifier && initialPositionModifier > 0 ?
                          field.initialPosition - initialPositionModifier :
                          field.initialPosition;

    const finalPosition: number = initialPosition - 1 + field.size;

    const textParts = new PartsOfText(
      text.substring(0, initialPosition - 1),
      text.substring(initialPosition - 1, finalPosition),
      text.substring(finalPosition, text.length),
    );

    return textParts;
  }

  private static addMarkToMiddlePart(field: Field, textParts: PartsOfText): PartsOfText {
    const isMiddlePartEmpty = textParts.middlePart.length === 0;
    if (isMiddlePartEmpty) {
      return textParts;
    }

    const classAttribute = `class="${field.name}"`;
    const colorStyleAttribute = field.color ? ` style="color: ${field.color}"` : '';

    textParts.middlePart = `<mark ${classAttribute}${colorStyleAttribute}>` +
                           `${textParts.middlePart}` +
                           '</mark>';
    return textParts;
  }

  private static sortFieldsByInitialPositionAsc(fields: Field[]) {
    fields.sort(MarkService.compareFieldInitialPosition);
    return fields;
  }

  private static compareFieldInitialPosition(field1: Field, field2: Field) {
    if (field1.initialPosition < field2.initialPosition) {
      return -1;
    }
    if (field1.initialPosition > field2.initialPosition) {
      return 1;
    }
    return 0;
  }
}
