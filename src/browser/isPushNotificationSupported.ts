/**
 * Check whether the environment supports the Web Push API
 *
 * Requires Notification, Service Worker, and PushManager. Does not check
 * permission and does not register a service worker.
 *
 * @returns Whether Web Push is supported
 */
export const isPushNotificationSupported = (): boolean =>
  'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
