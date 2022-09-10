import { isScrollBehaviorSupported } from './isScrollBehaviorSupported.js';

/**
 * Scroll window or other scrollable element to given position
 *
 * @param x Horizontal position to scroll to
 * @param y Vertical position to scroll to
 * @param smoothScroll Enable smooth scroll if supported, true by default
 * @param target Target to be scrolled, window by default
 * @returns void
 */
export const scrollToPosition = (x: number, y: number, smoothScroll: boolean = true, target: Window | HTMLElement = window): void => {
  if (smoothScroll && isScrollBehaviorSupported()) {
    target.scrollTo({
      top: y,
      left: x,
      behavior: 'smooth',
    });
  } else {
    target.scrollTo(x, y);
  }
};
