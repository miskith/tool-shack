/**
 * Remove diacritics & accents from string
 *
 * @param value String from which should be removed diacritics & accents
 * @returns ASCII string with removed diacritics & accents
 */
export const removeDiacritics = (value: string): string =>
  value
    .normalize('NFD')
    .toString()
    .replace(/[\u0300-\u036f]/g, '');
