/**
 * Remove duplicate values from array
 *
 * @param array Array of items to deduplicate
 * @param keyFn Optional callback returning key to distinguish items by
 * @returns Deduplicated array
 */
export const unique = <T>(array: T[], keyFn?: (item: T, index: number) => unknown): T[] => {
  if (!keyFn) {
    return Array.from(new Set(array));
  }

  const seen = new Set<unknown>();
  const result: T[] = [];

  array.forEach((item, index) => {
    const key = keyFn(item, index);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  });

  return result;
};
