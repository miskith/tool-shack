import type { ICookieOptions } from './interfaces/setCookie.js';
import { setCookie } from './setCookie.js';

/**
 * Delete a browser cookie by name
 *
 * @param name Cookie name to delete
 * @param options Optional path and domain to match cookie scope
 * @returns void
 */
export const deleteCookie = (
  name: string,
  options?: Pick<ICookieOptions, 'path' | 'domain'>,
): void => {
  setCookie(name, '', { ...options, days: -1 });
};
