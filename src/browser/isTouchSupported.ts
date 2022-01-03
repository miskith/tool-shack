import { IExtendedWindow } from './interfaces/isTouchSupported';

/**
 * Check if user's browser supports touch events
 *
 * @returns Boolean indicating if user's browser support touch events
 */
export const isTouchSupported = (): boolean =>
  'ontouchstart' in window ||
  ((window as unknown as IExtendedWindow).DocumentTouch &&
    document instanceof (window as unknown as IExtendedWindow).DocumentTouch);
