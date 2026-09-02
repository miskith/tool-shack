import type { IRetryOptions } from './interfaces/retry.js';
import { sleep } from './sleep.js';

/**
 * Retry an async operation given number of times before failing
 *
 * @param asyncOperation Async function to retry
 * @param options Configuration options (retries, delay, backoff)
 * @returns Promise resolving with the result of asyncOperation
 */
export const retry = async <T>(
  asyncOperation: () => Promise<T>,
  options?: IRetryOptions,
): Promise<T> => {
  const retries = options?.retries ?? 3;
  const baseDelay = options?.delay ?? 1000;
  const backoff = options?.backoff ?? true;

  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await asyncOperation();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        const currentDelay = backoff ? baseDelay * Math.pow(2, attempt) : baseDelay;
        if (currentDelay > 0) {
          await sleep(currentDelay);
        }
      }
    }
  }

  throw lastError;
};
