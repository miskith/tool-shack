import type { ICookieOptions } from './interfaces/setCookie.js';

/**
 * Set a browser cookie
 *
 * @param name Cookie name
 * @param value Cookie value
 * @param options Cookie options (days, path, domain, secure, sameSite)
 * @returns void
 */
export const setCookie = (name: string, value: string, options?: ICookieOptions): void => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options?.days !== undefined) {
    const expires = new Date(Date.now() + options.days * 86400000).toUTCString();
    cookieString += `; expires=${expires}`;
  }

  cookieString += `; path=${options?.path ?? '/'}`;

  if (options?.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options?.secure) {
    cookieString += '; secure';
  }

  if (options?.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieString;
};
