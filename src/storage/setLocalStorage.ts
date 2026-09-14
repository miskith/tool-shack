import type { IStorageOptions } from './interfaces/storage.js';
import { encodeBase64 } from '../string/index.js';

/**
 * Store item in localStorage with automatic JSON serialization and optional Base64 encoding
 *
 * @param key Storage key
 * @param value Value to store
 * @param options Storage options including optional Base64 encoding
 * @returns Whether a JSON-serializable payload was stored
 */
export const setLocalStorage = <T>(key: string, value: T, options?: IStorageOptions): boolean => {
  try {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    const json = JSON.stringify(value);
    if (json === undefined) {
      return false;
    }
    const payload = options?.encode ? encodeBase64(json) : json;
    localStorage.setItem(key, payload);
    return true;
  } catch {
    return false;
  }
};
