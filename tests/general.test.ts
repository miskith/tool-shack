import { describe, it, expect } from 'vitest';
import { isEmpty, isNil, isValidJson } from '../src/general/index.js';

describe('general utilities', () => {
  describe('isNil', () => {
    it('returns true for null and undefined', () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
    });

    it('returns false for non-nil values', () => {
      expect(isNil(0)).toBe(false);
      expect(isNil('')).toBe(false);
      expect(isNil(false)).toBe(false);
      expect(isNil({})).toBe(false);
      expect(isNil([])).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('returns true for nil values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    it('returns true for empty string, array, and object', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it('returns false for non-empty values', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
      expect(isEmpty(123)).toBe(false);
    });

    it('returns false for functions', () => {
      expect(isEmpty(() => {})).toBe(false);
    });
  });

  describe('isValidJson', () => {
    it('returns true for valid JSON strings', () => {
      expect(isValidJson('{"a":1}')).toBe(true);
      expect(isValidJson('[1,2,3]')).toBe(true);
      expect(isValidJson('"hello"')).toBe(true);
      expect(isValidJson('123')).toBe(true);
      expect(isValidJson('true')).toBe(true);
    });

    it('returns false for invalid JSON strings', () => {
      expect(isValidJson('{a:1}')).toBe(false);
      expect(isValidJson('undefined')).toBe(false);
      expect(isValidJson('')).toBe(false);
      expect(isValidJson('{"broken":')).toBe(false);
    });
  });
});
