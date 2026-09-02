/**
 * Remove item from sessionStorage
 *
 * @param key Storage key to remove
 * @returns void
 */
export const removeSessionStorage = (key: string): void => {
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  } catch {
    // Storage access restricted
  }
};
