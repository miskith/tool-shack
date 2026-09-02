import { removeDiacritics } from './removeDiacritics.js';

/**
 * Convert string to snake_case
 *
 * @param value String to convert
 * @returns snake_case string
 */
export const snakeCase = (value: string): string =>
  removeDiacritics(value)
    .trim()
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/[-_\s]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
