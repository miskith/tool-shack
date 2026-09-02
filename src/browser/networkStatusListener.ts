/**
 * Set callbacks for when browser goes online or offline
 *
 * @param onOnline Callback when connection is restored
 * @param onOffline Callback when connection is lost
 * @returns Cleanup function to remove event listeners
 */
export const networkStatusListener = (
  onOnline?: () => void,
  onOffline?: () => void,
): (() => void) => {
  const handleOnline = (): void => onOnline?.();
  const handleOffline = (): void => onOffline?.();

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};
