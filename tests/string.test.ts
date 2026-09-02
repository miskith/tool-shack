import { describe, it, expect } from 'vitest';
import { byteSize, escapeHTML, removeDiacritics, slugify, truncate } from '../src/string/index.js';

describe('string utilities', () => {
  describe('byteSize', () => {
    it('calculates the byte size of an ASCII string', () => {
      expect(byteSize('hello')).toBe(5);
      expect(byteSize('')).toBe(0);
    });

    it('calculates the byte size of multi-byte and Unicode strings', () => {
      expect(byteSize('č')).toBe(2);
      expect(byteSize('🚀')).toBe(4);
    });
  });

  describe('escapeHTML', () => {
    it('escapes HTML special characters', () => {
      expect(escapeHTML('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert("xss")&lt;/script&gt;',
      );
      expect(escapeHTML('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    it('handles empty and plain strings', () => {
      expect(escapeHTML('')).toBe('');
      expect(escapeHTML('plain text')).toBe('plain text');
    });
  });

  describe('removeDiacritics', () => {
    it('removes accents from characters', () => {
      expect(removeDiacritics('café')).toBe('cafe');
      expect(removeDiacritics('Příliš žluťoučký kůň')).toBe('Prilis zlutoucky kun');
    });

    it('returns original string if no diacritics', () => {
      expect(removeDiacritics('hello world')).toBe('hello world');
    });
  });

  describe('slugify', () => {
    it('converts text into URL slug with default dash separator', () => {
      expect(slugify('Hello World!')).toBe('hello-world');
      expect(slugify('  Příliš   žluťoučký kůň  ')).toBe('prilis-zlutoucky-kun');
    });

    it('supports custom separator', () => {
      expect(slugify('Hello World', '_')).toBe('hello_world');
    });

    it('handles empty strings', () => {
      expect(slugify('')).toBe('');
    });
  });

  describe('truncate', () => {
    it('truncates strings longer than maxLength and appends default ellipsis', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
    });

    it('does not truncate strings shorter than or equal to maxLength', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
      expect(truncate('Hello', 5)).toBe('Hello');
    });

    it('supports custom suffix', () => {
      expect(truncate('Hello World', 8, ' [..]')).toBe('Hel [..]');
    });

    it('handles maxLength shorter than suffix length', () => {
      expect(truncate('Hello World', 2, '...')).toBe('..');
    });
  });
});
