/**
 * Group array elements by key returned from keyFn
 *
 * @param array Array of items
 * @param keyFn Function returning key to group by
 * @returns Object grouped by keys
 */
export const groupBy = <T, K extends string | number | symbol>(
  array: T[],
  keyFn: (item: T, index: number) => K,
): Record<K, T[]> => {
  const result = {} as Record<K, T[]>;

  array.forEach((item, index) => {
    const key = keyFn(item, index);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  });

  return result;
};
