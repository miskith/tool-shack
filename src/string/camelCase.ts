import { removeDiacritics } from './removeDiacritics.js';

/**
 * Convert string to camelCase
 *
 * @param value String to convert
 * @returns camelCase string
 */
export const camelCase = (value: string): string =>
  removeDiacritics(value)
    .trim()
    .replace(/^[-_\s]+|[-_\s]+$/g, '')
    .replace(/[-_\s]+(.)?/g, (_, character) => (character ? character.toUpperCase() : ''))
    .replace(/^[A-Z]/, (character) => character.toLowerCase());
