/**
 * Remove item from localStorage
 *
 * @param key Storage key to remove
 * @returns void
 */
export const removeLocalStorage = (key: string): void => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  } catch {
    // Storage access restricted
  }
};
