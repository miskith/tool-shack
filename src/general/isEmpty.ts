import { isNil } from './isNil';

/**
 * Check if given value is empty
 *
 * @param value Value to be checked
 * @returns Boolean indicating if given value is empty
 */
export const isEmpty = (value: any): boolean => {
  if (value instanceof Function) {
    return false;
  }

  return (
    isNil(value) ||
    (value instanceof Object &&
      !Object.keys(value).length &&
      Object.getPrototypeOf(value) === Object.prototype) ||
    !value.valueOf().toString().length
  );
};
