/**
 * Safely encode a Unicode string to Base64
 *
 * @param value String to encode
 * @returns Base64 encoded string
 */
export const encodeBase64 = (value: string): string =>
  btoa(
    encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16)),
    ),
  );
