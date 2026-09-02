import type { IFullscreenFallbackOptions } from './interfaces/toggleFullscreenWithFallback.js';

/**
 * Toggle fullscreen mode with CSS pseudo-fullscreen fallback for unsupported environments (such as iOS Safari)
 *
 * @param element Target HTMLElement to toggle fullscreen for (defaults to documentElement)
 * @param options Optional configuration for fallback CSS class or z-index
 * @returns Promise resolving to boolean indicating whether element is currently fullscreen/pseudo-fullscreen
 */
export const toggleFullscreenWithFallback = async (
  element: HTMLElement = document.documentElement,
  options?: IFullscreenFallbackOptions,
): Promise<boolean> => {
  const isNativeSupported =
    typeof element.requestFullscreen === 'function' &&
    typeof document.exitFullscreen === 'function';

  if (isNativeSupported) {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return false;
    }
    await element.requestFullscreen();
    return true;
  }

  // Fallback: CSS pseudo-fullscreen
  const customClass = options?.className;
  const zIndex = options?.zIndex ?? 9999;
  const isPseudoActive = element.dataset.pseudoFullscreen === 'true';

  if (isPseudoActive) {
    if (customClass) {
      element.classList.remove(customClass);
    } else {
      element.style.position = element.dataset.prevPosition ?? '';
      element.style.top = element.dataset.prevTop ?? '';
      element.style.left = element.dataset.prevLeft ?? '';
      element.style.width = element.dataset.prevWidth ?? '';
      element.style.height = element.dataset.prevHeight ?? '';
      element.style.zIndex = element.dataset.prevZIndex ?? '';
      element.style.overflow = element.dataset.prevOverflow ?? '';

      delete element.dataset.prevPosition;
      delete element.dataset.prevTop;
      delete element.dataset.prevLeft;
      delete element.dataset.prevWidth;
      delete element.dataset.prevHeight;
      delete element.dataset.prevZIndex;
      delete element.dataset.prevOverflow;
    }

    delete element.dataset.pseudoFullscreen;
    return false;
  }

  if (customClass) {
    element.classList.add(customClass);
  } else {
    element.dataset.prevPosition = element.style.position;
    element.dataset.prevTop = element.style.top;
    element.dataset.prevLeft = element.style.left;
    element.dataset.prevWidth = element.style.width;
    element.dataset.prevHeight = element.style.height;
    element.dataset.prevZIndex = element.style.zIndex;
    element.dataset.prevOverflow = element.style.overflow;

    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '100vw';
    element.style.height = '100vh';
    element.style.zIndex = String(zIndex);
    element.style.overflow = 'auto';
  }

  element.dataset.pseudoFullscreen = 'true';
  return true;
};
