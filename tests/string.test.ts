import { describe, it, expect } from 'vitest';
import {
  byteSize,
  camelCase,
  capitalize,
  decodeBase64,
  encodeBase64,
  escapeHTML,
  formatBytes,
  kebabCase,
  mask,
  pascalCase,
  randomCryptoString,
  randomString,
  removeDiacritics,
  slugify,
  snakeCase,
  truncate,
  unescapeHTML,
} from '../src/string/index.js';

describe('string utilities', () => {
  describe('byteSize', () => {
    it('calculates the byte size of an ASCII string', () => {
      expect(byteSize('hello')).toBe(5);
      expect(byteSize('')).toBe(0);
    });

    it('calculates the byte size of multi-byte and Unicode strings', () => {
      expect(byteSize('č')).toBe(2);
      expect(byteSize('🚀')).toBe(4);
      expect(byteSize('你好世界')).toBe(12);
      expect(byteSize('👨‍👩‍👧‍👦')).toBe(25);
    });
  });

  describe('escapeHTML & unescapeHTML', () => {
    it('escapes HTML special characters', () => {
      expect(escapeHTML('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert("xss")&lt;/script&gt;',
      );
      expect(escapeHTML('Tom & Jerry')).toBe('Tom &amp; Jerry');
      expect(escapeHTML('<b>Bold & Strong</b>')).toBe('&lt;b&gt;Bold &amp; Strong&lt;/b&gt;');
    });

    it('unescapes HTML entities back to plain characters', () => {
      expect(unescapeHTML('&lt;div&gt;Hello &amp; World&lt;/div&gt;')).toBe(
        '<div>Hello & World</div>',
      );
      expect(unescapeHTML('&#039;quote&#039; and &quot;double&quot;')).toBe(
        '\'quote\' and "double"',
      );
    });

    it('round-trips complex strings with emojis, unicode, and symbols safely', () => {
      const complex = '<a href="https://example.com?foo=1&bar=2">🚀 Launch & Win 2026 你好!</a>';
      expect(unescapeHTML(escapeHTML(complex))).toBe(complex);
    });

    it('handles empty and plain strings', () => {
      expect(escapeHTML('')).toBe('');
      expect(escapeHTML('plain text')).toBe('plain text');
      expect(unescapeHTML('')).toBe('');
      expect(unescapeHTML('plain text')).toBe('plain text');
    });
  });

  describe('removeDiacritics', () => {
    it('removes accents from characters', () => {
      expect(removeDiacritics('café')).toBe('cafe');
      expect(removeDiacritics('Příliš žluťoučký kůň')).toBe('Prilis zlutoucky kun');
      expect(removeDiacritics('München')).toBe('Munchen');
      expect(removeDiacritics('Crème brûlée')).toBe('Creme brulee');
    });

    it('returns original string if no diacritics', () => {
      expect(removeDiacritics('hello world')).toBe('hello world');
      expect(removeDiacritics('你好世界')).toBe('你好世界');
      expect(removeDiacritics('🚀')).toBe('🚀');
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

    it('handles edge cases (empty strings, emojis, special characters)', () => {
      expect(slugify('')).toBe('');
      expect(slugify('   ')).toBe('');
      expect(slugify('---Hello---World---')).toBe('hello-world');
      expect(slugify('🚀 Rocket #1 Launch!')).toBe('rocket-1-launch');
    });
  });

  describe('truncate', () => {
    it('truncates strings longer than maxLength and appends default ellipsis', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
    });

    it('does not truncate strings shorter than or equal to maxLength', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
      expect(truncate('Hello', 5)).toBe('Hello');
      expect(truncate('', 5)).toBe('');
    });

    it('supports custom suffix', () => {
      expect(truncate('Hello World', 8, ' [..]')).toBe('Hel [..]');
    });

    it('handles maxLength shorter than suffix length or zero', () => {
      expect(truncate('Hello World', 2, '...')).toBe('..');
      expect(truncate('Hello World', 0, '...')).toBe('');
      expect(truncate('Hello World', -5, '...')).toBe('');
    });
  });

  describe('capitalize', () => {
    it('capitalizes the first character of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('hello world')).toBe('Hello world');
      expect(capitalize('')).toBe('');
      expect(capitalize('a')).toBe('A');
      expect(capitalize('A')).toBe('A');
    });

    it('handles emojis, symbols, and non-Latin scripts safely without crashing', () => {
      expect(capitalize('🚀rocket')).toBe('🚀rocket');
      expect(capitalize('你好世界')).toBe('你好世界');
      expect(capitalize('123abc')).toBe('123abc');
      expect(capitalize('-test')).toBe('-test');
    });
  });

  describe('case conversions', () => {
    it('converts to camelCase', () => {
      expect(camelCase('hello world')).toBe('helloWorld');
      expect(camelCase('hello-world-foo')).toBe('helloWorldFoo');
      expect(camelCase('hello_world_bar')).toBe('helloWorldBar');
      expect(camelCase('PascalCaseString')).toBe('pascalCaseString');
      expect(camelCase('Příliš žluťoučký')).toBe('prilisZlutoucky');
    });

    it('converts to kebabCase', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('hello world')).toBe('hello-world');
      expect(kebabCase('hello_world')).toBe('hello-world');
      expect(kebabCase('Příliš žluťoučký')).toBe('prilis-zlutoucky');
    });

    it('converts to pascalCase', () => {
      expect(pascalCase('hello world')).toBe('HelloWorld');
      expect(pascalCase('hello-world')).toBe('HelloWorld');
      expect(pascalCase('hello_world')).toBe('HelloWorld');
    });

    it('converts to snakeCase', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
      expect(snakeCase('hello-world')).toBe('hello_world');
      expect(snakeCase('hello world')).toBe('hello_world');
      expect(snakeCase('Příliš žluťoučký')).toBe('prilis_zlutoucky');
    });

    it('handles adversarial edge cases: non-Latin scripts, emojis, excessive delimiters, empty input', () => {
      // Empty & whitespace
      expect(camelCase('')).toBe('');
      expect(kebabCase('')).toBe('');
      expect(pascalCase('')).toBe('');
      expect(snakeCase('')).toBe('');
      expect(camelCase('   ')).toBe('');
      expect(kebabCase('   ')).toBe('');
      expect(pascalCase('   ')).toBe('');
      expect(snakeCase('   ')).toBe('');

      // Excessive / repeated delimiters
      expect(camelCase('---hello___world---')).toBe('helloWorld');
      expect(kebabCase('---hello___world---')).toBe('hello-world');
      expect(pascalCase('---hello___world---')).toBe('HelloWorld');
      expect(snakeCase('---hello___world---')).toBe('hello_world');

      // Non-Latin scripts (Chinese, Cyrillic)
      expect(camelCase('你好 世界')).toBe('你好世界');
      expect(kebabCase('你好 世界')).toBe('你好-世界');
      expect(snakeCase('你好 世界')).toBe('你好_世界');
      expect(pascalCase('你好 世界')).toBe('你好世界');

      expect(camelCase('привет мир')).toBe('приветМир');
      expect(kebabCase('привет мир')).toBe('привет-мир');
      expect(snakeCase('привет мир')).toBe('привет_мир');

      // Emojis & numbers
      expect(camelCase('🚀 rocket 🌟 launch')).toBe('🚀Rocket🌟Launch');
      expect(kebabCase('🚀 rocket 🌟 launch')).toBe('🚀-rocket-🌟-launch');
      expect(snakeCase('🚀 rocket 🌟 launch')).toBe('🚀_rocket_🌟_launch');

      expect(camelCase('v2_release_candidate_1')).toBe('v2ReleaseCandidate1');
      expect(kebabCase('v2_release_candidate_1')).toBe('v2-release-candidate-1');
      expect(snakeCase('v2-release-candidate-1')).toBe('v2_release_candidate_1');
    });
  });

  describe('formatBytes', () => {
    it('formats bytes into readable size representation', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
      expect(formatBytes(-100)).toBe('0 Bytes');
      expect(formatBytes(NaN)).toBe('0 Bytes');
      expect(formatBytes(500)).toBe('500 Bytes');
      expect(formatBytes(1024)).toBe('1 KB');
      expect(formatBytes(1536)).toBe('1.5 KB');
      expect(formatBytes(1048576)).toBe('1 MB');
      expect(formatBytes(1073741824)).toBe('1 GB');
      expect(formatBytes(1099511627776)).toBe('1 TB');
    });

    it('supports custom decimal precision', () => {
      expect(formatBytes(1536, 0)).toBe('2 KB');
      expect(formatBytes(1536, 3)).toBe('1.5 KB');
    });
  });

  describe('mask', () => {
    it('masks sensitive parts of strings', () => {
      expect(mask('4111123456789012', { visibleStart: 4, visibleEnd: 4 })).toBe('4111********9012');
      expect(mask('secretpassword', { visibleStart: 2 })).toBe('se************');
      expect(mask('secretpassword', { visibleEnd: 3 })).toBe('***********ord');
      expect(mask('secret', { visibleStart: 1, visibleEnd: 1, maskChar: '#' })).toBe('s####t');
    });

    it('handles edge cases (empty string, short strings)', () => {
      expect(mask('')).toBe('');
      expect(mask('abc', { visibleStart: 2, visibleEnd: 2 })).toBe('abc');
      expect(mask('secret')).toBe('******');
    });
  });

  describe('randomString & randomCryptoString', () => {
    it('generates random strings of specified length', () => {
      const s1 = randomString(10);
      const s2 = randomString(10);
      expect(s1).toHaveLength(10);
      expect(s2).toHaveLength(10);
      expect(s1).not.toBe(s2);
    });

    it('uses custom charset in randomString', () => {
      const hex = randomString(20, '0123456789ABCDEF');
      expect(hex).toMatch(/^[0-9A-F]{20}$/);
    });

    it('generates cryptographically secure random string with randomCryptoString', () => {
      const cryptoStr = randomCryptoString(16);
      expect(cryptoStr).toHaveLength(16);

      const customCrypto = randomCryptoString(12, 'abc');
      expect(customCrypto).toMatch(/^[abc]{12}$/);
    });

    it('handles boundary lengths (0, single char charset, large length)', () => {
      expect(randomString(0)).toBe('');
      expect(randomCryptoString(0)).toBe('');

      expect(randomString(5, 'A')).toBe('AAAAA');
      expect(randomCryptoString(5, 'Z')).toBe('ZZZZZ');

      const longRandom = randomString(500);
      expect(longRandom).toHaveLength(500);
      const longCrypto = randomCryptoString(500);
      expect(longCrypto).toHaveLength(500);
    });
  });

  describe('encodeBase64 & decodeBase64', () => {
    it('encodes and decodes ASCII and Unicode strings safely', () => {
      const ascii = 'Hello World 123!';
      const encodedAscii = encodeBase64(ascii);
      expect(encodedAscii).toBe(btoa(ascii));
      expect(decodeBase64(encodedAscii)).toBe(ascii);

      const unicode = 'Příliš žluťoučký kůň 🚀 你好!';
      const encodedUnicode = encodeBase64(unicode);
      expect(decodeBase64(encodedUnicode)).toBe(unicode);
    });

    it('handles empty strings and special characters', () => {
      expect(encodeBase64('')).toBe('');
      expect(decodeBase64('')).toBe('');
      expect(decodeBase64(encodeBase64('{"valid": true, "count": 42}'))).toBe(
        '{"valid": true, "count": 42}',
      );
    });
  });
});
