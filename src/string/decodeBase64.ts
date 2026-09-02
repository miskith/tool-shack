/**
 * Safely decode a Base64 string to a Unicode string
 *
 * @param value Base64 string to decode
 * @returns Decoded Unicode string
 */
export const decodeBase64 = (value: string): string =>
  decodeURIComponent(
    Array.prototype.map
      .call(
        atob(value),
        (character: string) => `%${`00${character.charCodeAt(0).toString(16)}`.slice(-2)}`,
      )
      .join(''),
  );
