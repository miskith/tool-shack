import type { IDebouncedFunction } from './interfaces/debounce.js';

/**
 * Creates a debounced function that delays invoking callback until after delay milliseconds
 *
 * @param callback Function to debounce
 * @param delay Milliseconds to delay
 * @returns Debounced function with cancel method
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay = 300,
): IDebouncedFunction<T> => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>): void => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };

  debounced.cancel = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
};
