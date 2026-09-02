/**
 * Get browser cookie value by name
 *
 * @param name Cookie name
 * @returns Decoded cookie value or null if not found
 */
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${encodeURIComponent(name)}=([^;]*)`));

  return match ? decodeURIComponent(match[1]) : null;
};
