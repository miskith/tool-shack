import { isTabFocused } from './isTabFocused';

/**
 * Set callbacks for if current browser tab is in focus
 *
 * @param focusCallback Function to be called when current browser tab goes into focus
 * @param blurCallback Function to be called when current browser tab goes out of focus
 * @returns void
 */
export const tabFocusListener = (focusCallback?: () => void, blurCallback?: () => void): void => {
  document.addEventListener('visibilitychange', () => {
    if (isTabFocused()) {
      focusCallback?.call(this);
    } else {
      blurCallback?.call(this);
    }
  });
}
