import { pageVisibilityListener } from './pageVisibilityListener.js';

/**
 * @deprecated Use {@link pageVisibilityListener}. Same `visibilitychange`
 * listener; not window focus or blur.
 */
export const tabFocusListener = pageVisibilityListener;
