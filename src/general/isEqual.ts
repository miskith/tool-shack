import { isNil } from './isNil.js';

/**
 * Perform deep structural comparison between two values
 *
 * @param a First value to compare
 * @param b Second value to compare
 * @returns Boolean indicating whether two values are structurally equal
 */
export const isEqual = (a: unknown, b: unknown): boolean => {
  if (Object.is(a, b)) {
    return true;
  }

  if (isNil(a) || isNil(b)) {
    return a === b;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let index = 0; index < a.length; index++) {
      if (!isEqual(a[index], b[index])) {
        return false;
      }
    }
    return true;
  }

  if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
    const aRecord = a as Record<string, unknown>;
    const bRecord = b as Record<string, unknown>;
    const aKeys = Object.keys(aRecord);
    const bKeys = Object.keys(bRecord);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (const key of aKeys) {
      if (!Object.prototype.hasOwnProperty.call(bRecord, key)) {
        return false;
      }
      if (!isEqual(aRecord[key], bRecord[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
};
