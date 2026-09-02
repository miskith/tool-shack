import { describe, it, expect, vi } from 'vitest';
import {
  deleteCookie,
  detectOS,
  downloadFile,
  getCookie,
  getQueryParams,
  isPushNotificationSupported,
  isScrollBehaviorSupported,
  isShareSupported,
  isTabFocused,
  isTouchSupported,
  networkStatusListener,
  preferColorScheme,
  preferDarkColorScheme,
  preferLightColorScheme,
  setCookie,
  tabFocusListener,
} from '../src/browser/index.js';

describe('browser utilities', () => {
  describe('isTouchSupported', () => {
    it('returns boolean for touch support', () => {
      expect(typeof isTouchSupported()).toBe('boolean');
    });
  });

  describe('isPushNotificationSupported', () => {
    it('returns boolean for push notification support', () => {
      expect(typeof isPushNotificationSupported()).toBe('boolean');
    });
  });

  describe('isScrollBehaviorSupported', () => {
    it('returns boolean for scroll behavior support', () => {
      expect(typeof isScrollBehaviorSupported()).toBe('boolean');
    });
  });

  describe('isShareSupported', () => {
    it('returns boolean for share support', () => {
      expect(typeof isShareSupported()).toBe('boolean');
    });
  });

  describe('isTabFocused', () => {
    it('returns true when document is not hidden', () => {
      expect(isTabFocused()).toBe(true);
    });
  });

  describe('color scheme utilities', () => {
    it('evaluates color scheme based on matchMedia', () => {
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes('dark'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      expect(preferDarkColorScheme()).toBe(true);
      expect(preferLightColorScheme()).toBe(false);
      expect(preferColorScheme()).toBe('dark');
    });
  });

  describe('tabFocusListener', () => {
    it('triggers callback on visibilitychange', () => {
      const focusCb = vi.fn();
      const blurCb = vi.fn();

      tabFocusListener(focusCb, blurCb);

      document.dispatchEvent(new Event('visibilitychange'));
      expect(focusCb).toHaveBeenCalled();
    });
  });

  describe('downloadFile', () => {
    it('creates object url and triggers link download with string and Blob', () => {
      const createObjectURLMock = vi.fn().mockReturnValue('blob:test');
      const revokeObjectURLMock = vi.fn();
      globalThis.URL.createObjectURL = createObjectURLMock;
      globalThis.URL.revokeObjectURL = revokeObjectURLMock;

      const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click');

      downloadFile('test content', 'sample.txt');
      expect(createObjectURLMock).toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalled();
      expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:test');

      const blob = new Blob(['blob content'], { type: 'application/pdf' });
      downloadFile(blob, 'sample.pdf');
      expect(createObjectURLMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('getQueryParams', () => {
    it('parses query string parameters from URL', () => {
      const params = getQueryParams('https://example.com/?foo=bar&count=42');
      expect(params).toEqual({
        foo: 'bar',
        count: '42',
      });
    });

    it('handles complex URLs with hash fragments and encoded characters', () => {
      const params = getQueryParams('https://example.com/search?q=hello+world&tag=%23cool#top');
      expect(params.q).toBe('hello world');
      expect(params.tag).toBe('#cool');
    });

    it('returns empty object when no query string exists', () => {
      expect(getQueryParams('https://example.com')).toEqual({});
      expect(getQueryParams('')).toEqual({});
    });
  });

  describe('networkStatusListener', () => {
    it('adds listeners and invokes callbacks on online/offline events', () => {
      const onOnline = vi.fn();
      const onOffline = vi.fn();

      const cleanup = networkStatusListener(onOnline, onOffline);

      window.dispatchEvent(new Event('online'));
      expect(onOnline).toHaveBeenCalledTimes(1);

      window.dispatchEvent(new Event('offline'));
      expect(onOffline).toHaveBeenCalledTimes(1);

      cleanup();

      window.dispatchEvent(new Event('online'));
      expect(onOnline).toHaveBeenCalledTimes(1);
    });
  });

  describe('cookie utilities', () => {
    it('sets, gets, and deletes cookies including special characters', () => {
      window.location.href = 'https://localhost:3000';

      setCookie('username', 'john_doe');
      expect(getCookie('username')).toBe('john_doe');

      // Special characters & spaces in value
      setCookie('greeting', 'Hello World & Friends!');
      expect(getCookie('greeting')).toBe('Hello World & Friends!');

      setCookie('theme', 'dark', { days: 7, path: '/', sameSite: 'Strict' });
      expect(getCookie('theme')).toBe('dark');

      deleteCookie('username');
      expect(getCookie('username')).toBeNull();
      expect(getCookie('non_existent_cookie')).toBeNull();
    });
  });

  describe('detectOS', () => {
    it('identifies operating system from userAgent', () => {
      const originalUserAgent = navigator.userAgent;

      const setUserAgent = (ua: string): void => {
        Object.defineProperty(navigator, 'userAgent', {
          value: ua,
          configurable: true,
        });
      };

      setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');
      expect(detectOS()).toBe('ios');

      setUserAgent('Mozilla/5.0 (Linux; Android 14; Pixel 8)');
      expect(detectOS()).toBe('android');

      setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');
      expect(detectOS()).toBe('macos');

      setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
      expect(detectOS()).toBe('windows');

      setUserAgent('Mozilla/5.0 (X11; Linux x86_64)');
      expect(detectOS()).toBe('linux');

      setUserAgent('CustomBot/1.0');
      expect(detectOS()).toBe('unknown');

      setUserAgent(originalUserAgent);
    });
  });
});
