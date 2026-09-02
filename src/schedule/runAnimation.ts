import type { IAnimationControls } from './interfaces/runAnimation.js';

/**
 * Run function as animation using requestAnimationFrame
 *
 * @param callback Function to be run as animation
 * @param autoStart If animation should start right away or just return callbacks
 * @returns Callbacks to start animation (startAnimation) and stop animation (stopAnimation)
 */
export const runAnimation = (callback: () => void, autoStart = true): IAnimationControls => {
  let isRunning = false;
  let requestedAnimationFrame: number | null = null;

  const runAnimation = (): void => {
    requestedAnimationFrame = requestAnimationFrame((): void => {
      callback.call(this);

      if (isRunning) {
        runAnimation();
      }
    });
  };

  const startAnimation = (): void => {
    if (isRunning) {
      return;
    }

    isRunning = true;
    runAnimation();
  };

  const stopAnimation = (): void => {
    if (!isRunning) {
      return;
    }

    isRunning = false;

    if (!!requestedAnimationFrame) {
      cancelAnimationFrame(requestedAnimationFrame);
    }
  };

  if (autoStart) {
    startAnimation();
  }

  return { startAnimation, stopAnimation };
};
