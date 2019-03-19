/* eslint-disable no-undef */
const DemarkationService = require('../src/assets/js/services/demarkation_service');

describe('Field demarcation should apply <span> tag', () => {
  const text = 'thequickbrownfoxjumpsoverthelazydog';

  it('demarks in the middle of text', () => {
    const field = {
      name: 'myField',
      initialPosition: 14,
      finalPosition: 17,
    };
    const result = DemarkationService.demarkFieldOnText(field, text);
    expect(result).toBe('thequickbrown<span class="myField">fox</span>jumpsoverthelazydog');
  });

  it('demarks in the beggining middle of text', () => {
    const field = {
      name: 'myField',
      initialPosition: 1,
      finalPosition: 9,
    };
    const result = DemarkationService.demarkFieldOnText(field, text);
    expect(result).toBe('<span class="myField">thequick</span>brownfoxjumpsoverthelazydog');
  });

  it('demarks in the end of text', () => {
    const field = {
      name: 'myField',
      initialPosition: 29,
      finalPosition: 36,
    };
    const result = DemarkationService.demarkFieldOnText(field, text);
    expect(result).toBe('thequickbrownfoxjumpsoverthe<span class="myField">lazydog</span>');
  });

  it('demarks the whole text', () => {
    const field = {
      name: 'myField',
      initialPosition: 1,
      finalPosition: 36,
    };
    const result = DemarkationService.demarkFieldOnText(field, text);
    expect(result).toBe('<span class="myField">thequickbrownfoxjumpsoverthelazydog</span>');
  });
});
