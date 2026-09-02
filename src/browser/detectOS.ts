import type { TOSName } from './interfaces/detectOS.js';

/**
 * Detect user operating system from browser environment
 *
 * @returns Detected OS name ('ios' | 'android' | 'macos' | 'windows' | 'linux' | 'unknown')
 */
export const detectOS = (): TOSName => {
  if (typeof navigator === 'undefined') {
    return 'unknown';
  }

  const userAgent = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  }
  if (/android/.test(userAgent)) {
    return 'android';
  }
  if (/macintosh|mac os x/.test(userAgent)) {
    return 'macos';
  }
  if (/windows|win32|win64/.test(userAgent)) {
    return 'windows';
  }
  if (/linux/.test(userAgent)) {
    return 'linux';
  }

  return 'unknown';
};
