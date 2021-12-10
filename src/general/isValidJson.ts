/**
 * Check if string is valid JSON
 *
 * @param value String value to be checked
 * @returns Boolean indicating if string value is a valid JSON
 */
export const isValidJson = (value: string): boolean => {
  try {
    JSON.parse(value);
  } catch (error: any) {
    return false;
  }

  return true;
};
