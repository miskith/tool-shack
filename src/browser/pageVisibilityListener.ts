import { isPageVisible } from './isPageVisible.js';

/**
 * Subscribe to Page Visibility changes
 *
 * Uses `visibilitychange` and `document.hidden`. This is not window focus or
 * blur.
 *
 * @param onVisible Called when the page becomes visible
 * @param onHidden Called when the page becomes hidden
 * @returns Cleanup function to remove the listener
 */
export const pageVisibilityListener = (
  onVisible?: () => void,
  onHidden?: () => void,
): (() => void) => {
  const handleVisibilityChange = (): void => {
    if (isPageVisible()) {
      onVisible?.();
    } else {
      onHidden?.();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};
