/**
 * Clear all items from sessionStorage
 *
 * @returns void
 */
export const clearSessionStorage = (): void => {
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }
  } catch {
    // Storage access restricted
  }
};
