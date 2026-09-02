/**
 * Clear all items from localStorage
 *
 * @returns void
 */
export const clearLocalStorage = (): void => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  } catch {
    // Storage access restricted
  }
};
