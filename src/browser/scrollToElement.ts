import { getOffset } from '../dom/getElementOffset.js';
import { scrollToPosition } from './scrollToPosition.js';

/**
 * Scroll window to make HTMLElement visible
 *
 * @param element Element to scroll to
 * @param offset Scroll offset from element, zero by default
 * @param smoothScroll Enable smooth scroll if supported, true by default
 * @returns void
 */
export const scrollToElement = (element: HTMLElement, offset: number = 0, smoothScroll: boolean = true): void => {
  offset = offset ?? window.innerHeight / 6;

  scrollToPosition(0, getOffset(element).top - offset, smoothScroll);
};
