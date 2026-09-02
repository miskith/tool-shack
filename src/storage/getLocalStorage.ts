import type { IStorageOptions } from './interfaces/storage.js';
import { decodeBase64 } from '../string/index.js';

/**
 * Retrieve item from localStorage with automatic JSON parsing and optional Base64 decoding
 *
 * @param key Storage key
 * @param fallback Optional fallback value if key does not exist or parsing fails
 * @param options Storage options including optional Base64 decoding
 * @returns Parsed value or fallback
 */
export const getLocalStorage = <T>(
  key: string,
  fallback: T | null = null,
  options?: IStorageOptions,
): T | null => {
  try {
    if (typeof localStorage === 'undefined') {
      return fallback;
    }
    const raw = localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }

    let json = raw;
    if (options?.encode) {
      try {
        json = decodeBase64(raw);
      } catch {
        json = raw;
      }
    }

    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};
