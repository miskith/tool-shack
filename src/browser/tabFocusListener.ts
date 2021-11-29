import { isTabFocused } from './isTabFocused';

export const tabFocusListener = (focusCallback: () => void, blurCallback: () => void): void => {
  document.addEventListener('visibilitychange', () => {
    if (isTabFocused()) {
      focusCallback.call(this);
    } else {
      blurCallback.call(this);
    }
  });
}
