import { isTabFocused } from './isTabFocused.js';

/**
 * Set callbacks for if current browser tab is in focus
 *
 * @param focusCallback Function to be called when current browser tab goes into focus
 * @param blurCallback Function to be called when current browser tab goes out of focus
 * @returns Cleanup function to remove the listener
 */
export const tabFocusListener = (
  focusCallback?: () => void,
  blurCallback?: () => void,
): (() => void) => {
  const handleVisibilityChange = (): void => {
    if (isTabFocused()) {
      focusCallback?.();
    } else {
      blurCallback?.();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};
