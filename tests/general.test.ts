import { describe, it, expect } from 'vitest';
import { chunk, clamp, groupBy, isEmpty, isNil, isValidJson } from '../src/general/index.js';

describe('general utilities', () => {
  describe('isNil', () => {
    it('returns true for null and undefined', () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
    });

    it('returns false for non-nil values including falsy values', () => {
      expect(isNil(0)).toBe(false);
      expect(isNil('')).toBe(false);
      expect(isNil(false)).toBe(false);
      expect(isNil(NaN)).toBe(false);
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

    it('returns true for empty Map and Set, and false for populated Map and Set', () => {
      expect(isEmpty(new Map())).toBe(true);
      expect(isEmpty(new Set())).toBe(true);

      const map = new Map();
      map.set('key', 'value');
      expect(isEmpty(map)).toBe(false);

      const set = new Set();
      set.add(1);
      expect(isEmpty(set)).toBe(false);
    });

    it('returns false for non-empty values', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
      expect(isEmpty(123)).toBe(false);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(false)).toBe(false);
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
      expect(isValidJson('null')).toBe(true);
    });

    it('returns false for invalid JSON strings and edge cases', () => {
      expect(isValidJson('{a:1}')).toBe(false);
      expect(isValidJson('undefined')).toBe(false);
      expect(isValidJson('')).toBe(false);
      expect(isValidJson('   ')).toBe(false);
      expect(isValidJson('{"broken":')).toBe(false);
      expect(isValidJson('[1, 2, ]')).toBe(false);
    });
  });

  describe('clamp', () => {
    it('restricts value within min and max boundaries', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('handles negative ranges and equal min/max', () => {
      expect(clamp(-8, -10, -5)).toBe(-8);
      expect(clamp(-12, -10, -5)).toBe(-10);
      expect(clamp(-2, -10, -5)).toBe(-5);
      expect(clamp(100, 5, 5)).toBe(5);
    });
  });

  describe('groupBy', () => {
    it('groups elements by callback key', () => {
      const users = [
        { name: 'Alice', role: 'admin' },
        { name: 'Bob', role: 'user' },
        { name: 'Charlie', role: 'admin' },
      ];

      const grouped = groupBy(users, (user) => user.role);
      expect(grouped.admin).toHaveLength(2);
      expect(grouped.user).toHaveLength(1);
    });

    it('handles grouping with index, numbers, and empty array', () => {
      expect(groupBy([], (x) => x)).toEqual({});

      const numbers = [1, 2, 3, 4, 5, 6];
      const parity = groupBy(numbers, (n) => (n % 2 === 0 ? 'even' : 'odd'));
      expect(parity.even).toEqual([2, 4, 6]);
      expect(parity.odd).toEqual([1, 3, 5]);
    });
  });

  describe('chunk', () => {
    it('splits array into chunks of specified size', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3, 4], 2)).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it('returns empty array when size <= 0 or input is empty', () => {
      expect(chunk([], 2)).toEqual([]);
      expect(chunk([1, 2, 3], 0)).toEqual([]);
      expect(chunk([1, 2, 3], -2)).toEqual([]);
    });

    it('returns single chunk if size >= array length', () => {
      expect(chunk([1, 2, 3], 10)).toEqual([[1, 2, 3]]);
    });
  });
});
