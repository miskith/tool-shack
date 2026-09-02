import { removeDiacritics } from './removeDiacritics.js';

/**
 * Convert string to kebab-case
 *
 * @param value String to convert
 * @returns kebab-case string
 */
export const kebabCase = (value: string): string =>
  removeDiacritics(value)
    .trim()
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/[-_\s]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
