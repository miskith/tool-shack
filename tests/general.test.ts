import { describe, it, expect } from 'vitest';
import {
  chunk,
  clamp,
  groupBy,
  isEmpty,
  isEqual,
  isNil,
  isValidJson,
  pick,
  unique,
} from '../src/general/index.js';

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

  describe('pick', () => {
    it('creates object composed of picked keys', () => {
      const user = { id: 1, name: 'Alice', email: 'alice@test.com', active: true };
      expect(pick(user, ['id', 'name'])).toEqual({ id: 1, name: 'Alice' });
      expect(pick(user, ['email'])).toEqual({ email: 'alice@test.com' });
    });

    it('handles empty keys or missing properties', () => {
      const user = { a: 1, b: 2 };
      expect(pick(user, [])).toEqual({});
      expect(pick({}, ['id' as never])).toEqual({});
    });
  });

  describe('unique', () => {
    it('deduplicates primitive array values', () => {
      expect(unique([1, 2, 2, 3, 1, 4])).toEqual([1, 2, 3, 4]);
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
      expect(unique([])).toEqual([]);
    });

    it('deduplicates object array values with custom key function', () => {
      const items = [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
        { id: 1, name: 'duplicate' },
      ];
      expect(unique(items, (item) => item.id)).toEqual([
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
      ]);
    });
  });

  describe('isEqual', () => {
    it('compares primitives correctly', () => {
      expect(isEqual(1, 1)).toBe(true);
      expect(isEqual('a', 'a')).toBe(true);
      expect(isEqual(true, true)).toBe(true);
      expect(isEqual(null, null)).toBe(true);
      expect(isEqual(undefined, undefined)).toBe(true);
      expect(isEqual(NaN, NaN)).toBe(true);

      expect(isEqual(1, 2)).toBe(false);
      expect(isEqual('a', 'b')).toBe(false);
      expect(isEqual(null, undefined)).toBe(false);
      expect(isEqual(0, false)).toBe(false);
    });

    it('compares Dates and RegExps', () => {
      expect(isEqual(new Date(2026, 0, 1), new Date(2026, 0, 1))).toBe(true);
      expect(isEqual(new Date(2026, 0, 1), new Date(2025, 0, 1))).toBe(false);

      expect(isEqual(/abc/g, /abc/g)).toBe(true);
      expect(isEqual(/abc/g, /abc/i)).toBe(false);
    });

    it('deeply compares nested objects and arrays', () => {
      const objA = { a: 1, b: [2, 3], c: { d: 'test' } };
      const objB = { a: 1, b: [2, 3], c: { d: 'test' } };
      const objC = { a: 1, b: [2, 4], c: { d: 'test' } };

      expect(isEqual(objA, objB)).toBe(true);
      expect(isEqual(objA, objC)).toBe(false);
      expect(isEqual([1, [2, [3]]], [1, [2, [3]]])).toBe(true);
      expect(isEqual([1, [2, [3]]], [1, [2, [4]]])).toBe(false);
    });

    it('handles mismatched key count or type differences', () => {
      expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
      expect(isEqual({ a: 1 }, null)).toBe(false);
      expect(isEqual([1, 2], { 0: 1, 1: 2 })).toBe(false);
    });
  });
});
