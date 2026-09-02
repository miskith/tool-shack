/**
 * Capitalize first character of string
 *
 * @param value String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (value: string): string =>
  value.length ? value.charAt(0).toUpperCase() + value.slice(1) : '';
