import type { IFullscreenFallbackOptions } from './interfaces/toggleFullscreenWithFallback.js';
import type { TPseudoFullscreenState } from './types/toggleFullscreenWithFallback.js';

const pseudoFullscreenState = new WeakMap<HTMLElement, TPseudoFullscreenState>();

const restorePseudoFullscreen = (element: HTMLElement, state: TPseudoFullscreenState): void => {
  switch (state.mode) {
    case 'class':
      if (state.added) {
        element.classList.remove(state.className);
      }
      break;
    case 'style':
      element.style.position = state.position;
      element.style.top = state.top;
      element.style.left = state.left;
      element.style.width = state.width;
      element.style.height = state.height;
      element.style.zIndex = state.zIndex;
      element.style.overflow = state.overflow;
      break;
    default: {
      const _exhaustive: never = state;
      throw new Error(`Unhandled pseudo-fullscreen state: ${_exhaustive}`);
    }
  }

  pseudoFullscreenState.delete(element);
};

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

  const existingState = pseudoFullscreenState.get(element);
  if (existingState) {
    restorePseudoFullscreen(element, existingState);
    return false;
  }

  const customClass = options?.className;
  const zIndex = options?.zIndex ?? 9999;

  if (customClass) {
    const added = !element.classList.contains(customClass);
    if (added) {
      element.classList.add(customClass);
    }
    pseudoFullscreenState.set(element, { mode: 'class', className: customClass, added });
  } else {
    const styleState: TPseudoFullscreenState = {
      mode: 'style',
      position: element.style.position,
      top: element.style.top,
      left: element.style.left,
      width: element.style.width,
      height: element.style.height,
      zIndex: element.style.zIndex,
      overflow: element.style.overflow,
    };
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '100vw';
    element.style.height = '100vh';
    element.style.zIndex = String(zIndex);
    element.style.overflow = 'auto';
    pseudoFullscreenState.set(element, styleState);
  }

  return true;
};
