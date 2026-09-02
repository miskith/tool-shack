/**
 * Check if a DOM element is currently within the visible viewport
 *
 * @param element Target HTMLElement to check
 * @param offset Optional margin offset in pixels to expand or shrink the viewport check boundary
 * @returns Boolean indicating whether element is in viewport
 */
export const isInViewport = (element: HTMLElement, offset = 0): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top <= windowHeight + offset &&
    rect.bottom >= -offset &&
    rect.left <= windowWidth + offset &&
    rect.right >= -offset
  );
};
