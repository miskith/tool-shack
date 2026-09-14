import { describe, it, expect, beforeEach } from 'vitest';
import {
  clearLocalStorage,
  clearSessionStorage,
  getLocalStorage,
  getSessionStorage,
  removeLocalStorage,
  removeSessionStorage,
  setLocalStorage,
  setSessionStorage,
} from '../src/storage/index.js';

describe('storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('localStorage', () => {
    it('stores, retrieves, and removes items from localStorage with JSON serialization', () => {
      const user = { id: 10, name: 'Alice', settings: { dark: true } };
      expect(setLocalStorage('user_data', user)).toBe(true);

      expect(getLocalStorage<typeof user>('user_data')).toEqual(user);
      expect(getLocalStorage('non_existent', 'default')).toBe('default');
      expect(getLocalStorage('non_existent')).toBeNull();

      removeLocalStorage('user_data');
      expect(getLocalStorage('user_data')).toBeNull();

      setLocalStorage('k1', 'v1');
      setLocalStorage('k2', 'v2');
      clearLocalStorage();
      expect(getLocalStorage('k1')).toBeNull();
      expect(getLocalStorage('k2')).toBeNull();
    });

    it('supports optional Unicode-safe Base64 encoding and decoding', () => {
      const complexData = {
        title: 'Příliš žluťoučký kůň 🚀',
        tags: ['你好', 'crème brûlée', 'emoji: 🌟'],
      };

      expect(setLocalStorage('encoded_item', complexData, { encode: true })).toBe(true);

      // Verify raw storage item is not plain JSON
      const rawStored = localStorage.getItem('encoded_item');
      expect(rawStored).not.toContain('Příliš');

      // Verify retrieval with decode
      expect(getLocalStorage<typeof complexData>('encoded_item', null, { encode: true })).toEqual(
        complexData,
      );
    });

    it('rejects top-level values that JSON.stringify does not serialize', () => {
      expect(setLocalStorage('ok_string', 'hello')).toBe(true);
      expect(getLocalStorage('ok_string')).toBe('hello');

      expect(setLocalStorage('ok_object', { a: 1 })).toBe(true);
      expect(getLocalStorage('ok_object')).toEqual({ a: 1 });

      expect(setLocalStorage('ok_null', null)).toBe(true);
      expect(localStorage.getItem('ok_null')).toBe('null');
      expect(getLocalStorage('ok_null')).toBeNull();

      expect(setLocalStorage('bad_undefined', undefined)).toBe(false);
      expect(localStorage.getItem('bad_undefined')).toBeNull();

      expect(setLocalStorage('bad_fn', () => 'nope')).toBe(false);
      expect(localStorage.getItem('bad_fn')).toBeNull();

      expect(setLocalStorage('bad_symbol', Symbol('x'))).toBe(false);
      expect(localStorage.getItem('bad_symbol')).toBeNull();

      expect(setLocalStorage('keep', 'kept')).toBe(true);
      expect(setLocalStorage('keep', undefined)).toBe(false);
      expect(getLocalStorage('keep')).toBe('kept');
    });
  });

  describe('sessionStorage', () => {
    it('stores, retrieves, and removes items from sessionStorage', () => {
      const token = { jwt: 'xyz123' };
      expect(setSessionStorage('auth', token)).toBe(true);
      expect(getSessionStorage<typeof token>('auth')).toEqual(token);

      removeSessionStorage('auth');
      expect(getSessionStorage('auth')).toBeNull();

      setSessionStorage('session1', 123);
      clearSessionStorage();
      expect(getSessionStorage('session1')).toBeNull();
    });

    it('supports optional Base64 encoding and decoding in sessionStorage', () => {
      const secret = { apiKey: 'secret_key_123', label: 'čeština' };
      expect(setSessionStorage('secret_auth', secret, { encode: true })).toBe(true);

      expect(getSessionStorage<typeof secret>('secret_auth', null, { encode: true })).toEqual(
        secret,
      );
    });

    it('rejects top-level values that JSON.stringify does not serialize', () => {
      expect(setSessionStorage('ok_number', 0)).toBe(true);
      expect(getSessionStorage('ok_number')).toBe(0);

      expect(setSessionStorage('ok_object', { a: 1 })).toBe(true);
      expect(getSessionStorage('ok_object')).toEqual({ a: 1 });

      expect(setSessionStorage('ok_null', null)).toBe(true);
      expect(sessionStorage.getItem('ok_null')).toBe('null');
      expect(getSessionStorage('ok_null')).toBeNull();

      expect(setSessionStorage('bad_undefined', undefined)).toBe(false);
      expect(sessionStorage.getItem('bad_undefined')).toBeNull();

      expect(setSessionStorage('bad_fn', () => 'nope')).toBe(false);
      expect(sessionStorage.getItem('bad_fn')).toBeNull();

      expect(setSessionStorage('bad_symbol', Symbol('x'))).toBe(false);
      expect(sessionStorage.getItem('bad_symbol')).toBeNull();

      expect(setSessionStorage('keep', 'kept')).toBe(true);
      expect(setSessionStorage('keep', undefined)).toBe(false);
      expect(getSessionStorage('keep')).toBe('kept');
    });
  });
});
