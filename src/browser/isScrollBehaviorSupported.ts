/**
 * Check if user's browser supports setting scroll behavior
 *
 * @returns Boolean indicating if user's browser supports setting scroll behavior
 */
export const isScrollBehaviorSupported = (): boolean =>
  !!('scrollBehavior' in document.documentElement.style);
