import type { IMaskOptions } from './interfaces/mask.js';

/**
 * Mask sensitive characters in a string for safe display
 *
 * @param value String to mask
 * @param options Configuration for visible characters and mask character
 * @returns Masked string
 */
export const mask = (value: string, options?: IMaskOptions): string => {
  const visibleStart = options?.visibleStart ?? 0;
  const visibleEnd = options?.visibleEnd ?? 0;
  const maskChar = options?.maskChar ?? '*';

  if (!value.length) {
    return '';
  }

  const totalVisible = visibleStart + visibleEnd;
  if (totalVisible >= value.length) {
    return value;
  }

  const start = value.slice(0, visibleStart);
  const end = visibleEnd > 0 ? value.slice(-visibleEnd) : '';
  const maskedLength = value.length - totalVisible;
  const maskedMiddle = maskChar.repeat(maskedLength);

  return `${start}${maskedMiddle}${end}`;
};
