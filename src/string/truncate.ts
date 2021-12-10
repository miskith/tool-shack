/**
 * Truncate string to maximum given length if needed and append string at the end (by default "...")
 *
 * @param value String value to be truncated
 * @param maxLength Maximum allowed length
 * @param appendedString String to append at the end, be default "..."
 * @returns Truncated value if needed otherwise original value
 */
export const truncate = (
  value: string,
  maxLength: number,
  appendedString: string = '...',
): string => {
  if (maxLength < appendedString.length) {
    return appendedString.slice(0, maxLength);
  }

  return value.length > maxLength
    ? value.slice(0, maxLength - appendedString.length) + appendedString
    : value;
};
