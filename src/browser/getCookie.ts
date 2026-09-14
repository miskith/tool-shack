/**
 * Get browser cookie value by name
 *
 * @param name Cookie name
 * @returns Decoded cookie value or null if not found
 */
export const getCookie = (name: string): string | null => {
  const encodedName = encodeURIComponent(name);

  for (const part of document.cookie.split(';')) {
    const entry = part.trim();
    const separatorIndex = entry.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    if (entry.slice(0, separatorIndex) === encodedName) {
      return decodeURIComponent(entry.slice(separatorIndex + 1));
    }
  }

  return null;
};
