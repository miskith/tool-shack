import { getElementOffset } from '../dom/getElementOffset.js';
import { scrollToPosition } from './scrollToPosition.js';

/**
 * Scroll window to make HTMLElement visible
 *
 * @param element Element to scroll to
 * @param offset Scroll offset from element, zero by default
 * @param smoothScroll Enable smooth scroll if supported, true by default
 * @returns void
 */
export const scrollToElement = (
  element: HTMLElement,
  offset: number = 0,
  smoothScroll: boolean = true,
): void => {
  scrollToPosition(0, getElementOffset(element).top - offset, smoothScroll);
};
