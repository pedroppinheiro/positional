import MarkService from '../src/renderer_process/services/MarkService';
import Field from '../src/renderer_process/models/Field';

describe('Field demarcation should apply <mark> tag', () => {
  const text: string = 'thequickbrownfoxjumpsoverthelazydog';

  it('demarks in the middle of text', () => {
    const field: Field = new Field('myField', 14, 3);
    const result = MarkService.markFieldOnText(field, text);
    expect(result).toBe('thequickbrown<mark class="myField">fox</mark>jumpsoverthelazydog');
  });

  it('demarks in the beggining middle of text', () => {
    const field: Field = new Field('myField', 1, 8);
    const result = MarkService.markFieldOnText(field, text);
    expect(result).toBe('<mark class="myField">thequick</mark>brownfoxjumpsoverthelazydog');
  });

  it('demarks in the end of text', () => {
    const field: Field = new Field('myField', 29, 7);
    const result = MarkService.markFieldOnText(field, text);
    expect(result).toBe('thequickbrownfoxjumpsoverthe<mark class="myField">lazydog</mark>');
  });

  it('demarks the whole text', () => {
    const field: Field = new Field('myField', 1, 35);
    const result = MarkService.markFieldOnText(field, text);
    expect(result).toBe('<mark class="myField">thequickbrownfoxjumpsoverthelazydog</mark>');
  });

  it('does not demark when there is no value', () => {
    const field: Field = new Field('myField', 1, 0);
    const result = MarkService.markFieldOnText(field, text);
    expect(result).toBe('thequickbrownfoxjumpsoverthelazydog');
  });

  it('does not demark when the end of the string is reached', () => {
    const field: Field = new Field('myField', 36, 1);
    const result = MarkService.markFieldOnText(field, text);
    expect(result).toBe('thequickbrownfoxjumpsoverthelazydog');
  });

  it('demarks correctly when the field exceeds the string lenght', () => {
    const field: Field = new Field('myField', 33, 999);
    const result = MarkService.markFieldOnText(field, text);
    expect(result).toBe('thequickbrownfoxjumpsoverthelazy<mark class="myField">dog</mark>');
  });

  it('demarks in the middle of text using fields', () => {
    const field: Field = new Field('myField', 14, 3);
    const fields: Field[] = [];
    fields.push(field);
    const result = MarkService.markFieldsOnText(fields, text);
    expect(result).toBe('thequickbrown<mark class="myField">fox</mark>jumpsoverthelazydog');
  });

  it('demarks two fields correctly', () => {
    const field1: Field = new Field('field1', 4, 5);
    const field2: Field = new Field('field2', 14, 3);

    const fields: Field[] = [];
    fields.push(field1);
    fields.push(field2);

    const result = MarkService.markFieldsOnText(fields, text);
    expect(result).toBe('the' +
                        '<mark class="field1">quick</mark>' +
                        'brown' +
                        '<mark class="field2">fox</mark>' +
                        'jumpsoverthelazydog');
  });

  it('demarks three fields correctly', () => {
    const field1: Field = new Field('field1', 4, 5);
    const field2: Field = new Field('field2', 14, 3);
    const field3: Field = new Field('field3', 22, 4);

    const fields: Field[] = [];
    fields.push(field1);
    fields.push(field2);
    fields.push(field3);

    const result = MarkService.markFieldsOnText(fields, text);
    expect(result).toBe('the' +
                        '<mark class="field1">quick</mark>' +
                        'brown' +
                        '<mark class="field2">fox</mark>' +
                        'jumps' +
                        '<mark class="field3">over</mark>' +
                        'thelazydog');
  });

  it('demarks three fields correctly even if fields are in wrong order', () => {
    const field1: Field = new Field('field1', 4, 5);
    const field2: Field = new Field('field2', 14, 3);
    const field3: Field = new Field('field3', 22, 4);

    const fields: Field[] = [];
    fields.push(field3);
    fields.push(field2);
    fields.push(field1);

    const result = MarkService.markFieldsOnText(fields, text);
    expect(result).toBe('the' +
                        '<mark class="field1">quick</mark>' +
                        'brown' +
                        '<mark class="field2">fox</mark>' +
                        'jumps' +
                        '<mark class="field3">over</mark>' +
                        'thelazydog');
  });
});
