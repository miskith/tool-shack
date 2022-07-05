import { removeDiacritics } from './removeDiacritics.js';

/**
 * Create slug from given string
 *
 * @param value String to be slugified
 * @param separator One character to be used as separator (if provided longer than one character, will be automatically shortened), dash ('-') by default
 * @returns Slugified string
 */
export const slugify = (value: string, separator: string = '-'): string => {
  separator = separator.trim().substring(0, 1) || '-';
  const removeCharsRegex = new RegExp(`[^\\\w\\\s${separator}]`, 'g');

  return removeDiacritics(value.trim().toLowerCase())
    .replace(removeCharsRegex, '')
    .replace(/\s+/g, separator);
};
