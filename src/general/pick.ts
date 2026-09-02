/**
 * Creates an object composed of the picked object properties
 *
 * @param object Source object to pick properties from
 * @param keys Array of keys to pick
 * @returns New object containing only picked properties
 */
export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: K[],
): Pick<T, K> => {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in object) {
      result[key] = object[key];
    }
  }

  return result;
};
