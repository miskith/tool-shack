import { isPageVisible } from './isPageVisible.js';

/**
 * @deprecated Use {@link isPageVisible}. Same as `!document.hidden`; not window
 * or tab input focus.
 */
export const isTabFocused = isPageVisible;
