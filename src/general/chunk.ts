/**
 * Split array into chunks of specified size
 *
 * @param array Array to split
 * @param size Size of each chunk
 * @returns Array of chunked arrays
 */
export const chunk = <T>(array: T[], size: number = 1): T[][] => {
  if (size <= 0 || !array.length) {
    return [];
  }

  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
};
