/**
 * Check if user's browser supports push notifications
 *
 * @returns Boolean indicating if user's browser supports push notifications
 */
export const isPushNotificationSupported = (): boolean =>
  !!(window.Notification || 'webkitNotifications' in window);
