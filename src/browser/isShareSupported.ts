/**
 * Check if user's browser supports navigator share
 *
 * @returns Boolean indicating if user's browser support navigator share
 */
export const isShareSupported = (): boolean =>
  !!('navigator' in window && 'share' in window.navigator && !!navigator.share);
