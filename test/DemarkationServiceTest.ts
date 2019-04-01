import DemarkationService from '../src/renderer_process/services/DemarkationService';
import Field from '../src/renderer_process/models/Field';

describe('Field demarcation should apply <span> tag', () => {
  const text: string = 'thequickbrownfoxjumpsoverthelazydog';

  it('demarks in the middle of text', () => {
    const field: Field = new Field('myField', 14, 3);
    const result = DemarkationService.demarkFieldOnText(field, text);
    expect(result).toBe('thequickbrown<span class="myField">fox</span>jumpsoverthelazydog');
  });

  it('demarks in the beggining middle of text', () => {
    const field: Field = new Field('myField', 1, 8);
    const result = DemarkationService.demarkFieldOnText(field, text);
    expect(result).toBe('<span class="myField">thequick</span>brownfoxjumpsoverthelazydog');
  });

  it('demarks in the end of text', () => {
    const field: Field = new Field('myField', 29, 7);
    const result = DemarkationService.demarkFieldOnText(field, text);
    expect(result).toBe('thequickbrownfoxjumpsoverthe<span class="myField">lazydog</span>');
  });

  it('demarks the whole text', () => {
    const field: Field = new Field('myField', 1, 35);
    const result = DemarkationService.demarkFieldOnText(field, text);
    expect(result).toBe('<span class="myField">thequickbrownfoxjumpsoverthelazydog</span>');
  });

  it('does not demark when there is no value', () => {
    const field: Field = new Field('myField', 1, 0);
    const result = DemarkationService.demarkFieldOnText(field, text);
    expect(result).toBe('thequickbrownfoxjumpsoverthelazydog');
  });

  it('does not demark when the end of the string is reached', () => {
    const field: Field = new Field('myField', 36, 1);
    const result = DemarkationService.demarkFieldOnText(field, text);
    expect(result).toBe('thequickbrownfoxjumpsoverthelazydog');
  });

  it('demarks correctly when the field exceeds the string lenght', () => {
    const field: Field = new Field('myField', 33, 999);
    const result = DemarkationService.demarkFieldOnText(field, text);
    expect(result).toBe('thequickbrownfoxjumpsoverthelazy<span class="myField">dog</span>');
  });
});
