/**
 * Toggle fullscreen mode for a given element or document root
 *
 * @param element Target HTMLElement to toggle fullscreen for (defaults to documentElement)
 * @returns Promise resolving when fullscreen state transition completes
 */
export const toggleFullscreen = async (
  element: HTMLElement = document.documentElement,
): Promise<void> => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else {
    await element.requestFullscreen();
  }
};
