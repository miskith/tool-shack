import type { IStorageOptions } from './interfaces/storage.js';
import { encodeBase64 } from '../string/index.js';

/**
 * Store item in sessionStorage with automatic JSON serialization and optional Base64 encoding
 *
 * @param key Storage key
 * @param value Value to store
 * @param options Storage options including optional Base64 encoding
 * @returns Boolean indicating whether operation succeeded
 */
export const setSessionStorage = <T>(key: string, value: T, options?: IStorageOptions): boolean => {
  try {
    if (typeof sessionStorage === 'undefined') {
      return false;
    }
    const json = JSON.stringify(value);
    const payload = options?.encode ? encodeBase64(json) : json;
    sessionStorage.setItem(key, payload);
    return true;
  } catch {
    return false;
  }
};
