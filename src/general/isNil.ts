/**
 * Check if value is equal to null or undefined
 *
 * @param value Value to be checked
 * @returns Boolean indicating if value is equal to null or undefined
 */
export const isNil = (value: unknown): value is null | undefined =>
  value === undefined || value === null;
