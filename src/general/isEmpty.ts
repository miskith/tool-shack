import { isNil } from './isNil.js';

/**
 * Check if given value is empty
 *
 * @param value Value to be checked
 * @returns Boolean indicating if given value is empty
 */
export const isEmpty = (value: unknown): boolean => {
  if (value instanceof Function) {
    return false;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  return (
    isNil(value) ||
    (value instanceof Object &&
      !Object.keys(value).length &&
      Object.getPrototypeOf(value) === Object.prototype) ||
    !String((value as { valueOf: () => unknown }).valueOf()).length
  );
};
