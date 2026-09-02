import type { IThrottledFunction } from './interfaces/throttle.js';

/**
 * Creates a throttled function that only invokes callback at most once per every limit milliseconds
 *
 * @param callback Function to throttle
 * @param limit Milliseconds to limit invocations
 * @returns Throttled function with cancel method
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  limit: number = 300,
): IThrottledFunction<T> => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const throttled = (...args: Parameters<T>): void => {
    if (timer === null) {
      callback(...args);
      timer = setTimeout(() => {
        timer = null;
        if (lastArgs !== null) {
          const currentArgs = lastArgs;
          lastArgs = null;
          throttled(...currentArgs);
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };

  throttled.cancel = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = null;
  };

  return throttled;
};
