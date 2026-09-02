/**
 * Pause execution for given duration in milliseconds
 *
 * @param ms Duration in milliseconds to sleep
 * @returns Promise resolving after the duration
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
