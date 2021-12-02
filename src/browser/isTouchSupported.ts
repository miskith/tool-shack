import { IExtendedWindow } from './interfaces/isTouchSupported';

export const isTouchSupported = (): boolean => (
  'ontouchstart' in window || (
    (window as unknown as IExtendedWindow).DocumentTouch && document instanceof (window as unknown as IExtendedWindow).DocumentTouch
  )
);
