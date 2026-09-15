import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  deleteCookie,
  detectOS,
  downloadFile,
  getCookie,
  getQueryParams,
  isPageVisible,
  isPushNotificationSupported,
  isScrollBehaviorSupported,
  isShareSupported,
  isTabFocused,
  isTouchSupported,
  networkStatusListener,
  pageVisibilityListener,
  preferColorScheme,
  preferDarkColorScheme,
  preferLightColorScheme,
  setCookie,
  tabFocusListener,
} from '../src/browser/index.js';

describe('browser utilities', () => {
  describe('isTouchSupported', () => {
    afterEach(() => {
      Reflect.deleteProperty(window, 'ontouchstart');
      Reflect.deleteProperty(window, 'DocumentTouch');
    });

    it('returns true when ontouchstart is on window', () => {
      Object.defineProperty(window, 'ontouchstart', { configurable: true, value: null });
      Reflect.deleteProperty(window, 'DocumentTouch');
      expect(isTouchSupported()).toBe(true);
    });

    it('returns true when DocumentTouch exists and document is an instance of it', () => {
      Reflect.deleteProperty(window, 'ontouchstart');
      Object.defineProperty(window, 'DocumentTouch', {
        configurable: true,
        value: document.constructor,
      });
      expect(isTouchSupported()).toBe(true);
    });

    it('returns false when ontouchstart and DocumentTouch are missing', () => {
      Reflect.deleteProperty(window, 'ontouchstart');
      Reflect.deleteProperty(window, 'DocumentTouch');
      expect(isTouchSupported()).toBe(false);
    });
  });

  describe('isPushNotificationSupported', () => {
    const setSupport = (
      notification: boolean,
      serviceWorker: boolean,
      pushManager: boolean,
    ): void => {
      const define = (target: object, key: string, present: boolean): void => {
        if (present) {
          Object.defineProperty(target, key, { configurable: true, value: {} });
        } else {
          Reflect.deleteProperty(target, key);
        }
      };

      define(window, 'Notification', notification);
      define(navigator, 'serviceWorker', serviceWorker);
      define(window, 'PushManager', pushManager);
    };

    it('returns true when Notification, serviceWorker, and PushManager exist', () => {
      setSupport(true, true, true);
      expect(isPushNotificationSupported()).toBe(true);
    });

    it('returns false when Notification is missing', () => {
      setSupport(false, true, true);
      expect(isPushNotificationSupported()).toBe(false);
    });

    it('returns false when serviceWorker is missing', () => {
      setSupport(true, false, true);
      expect(isPushNotificationSupported()).toBe(false);
    });

    it('returns false when PushManager is missing', () => {
      setSupport(true, true, false);
      expect(isPushNotificationSupported()).toBe(false);
    });
  });

  describe('isScrollBehaviorSupported', () => {
    afterEach(() => {
      Reflect.deleteProperty(document, 'documentElement');
    });

    it('returns true when scrollBehavior is in documentElement.style', () => {
      Object.defineProperty(document, 'documentElement', {
        configurable: true,
        value: { style: { scrollBehavior: 'smooth' } },
      });
      expect(isScrollBehaviorSupported()).toBe(true);
    });

    it('returns false when scrollBehavior is missing from documentElement.style', () => {
      Object.defineProperty(document, 'documentElement', {
        configurable: true,
        value: { style: {} },
      });
      expect(isScrollBehaviorSupported()).toBe(false);
    });
  });

  describe('isShareSupported', () => {
    afterEach(() => {
      Reflect.deleteProperty(navigator, 'share');
    });

    it('returns true when navigator.share is present', () => {
      Object.defineProperty(navigator, 'share', {
        configurable: true,
        value: (): void => undefined,
      });
      expect(isShareSupported()).toBe(true);
    });

    it('returns false when navigator.share is missing', () => {
      Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
      expect(isShareSupported()).toBe(false);
    });
  });

  describe('isPageVisible', () => {
    afterEach(() => {
      Reflect.deleteProperty(document, 'hidden');
    });

    it('returns true when document.hidden is false', () => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: false });
      expect(isPageVisible()).toBe(true);
    });

    it('returns false when document.hidden is true', () => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      expect(isPageVisible()).toBe(false);
    });

    it('isTabFocused is a deprecated alias of isPageVisible', () => {
      expect(isTabFocused).toBe(isPageVisible);
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

  describe('pageVisibilityListener', () => {
    afterEach(() => {
      Reflect.deleteProperty(document, 'hidden');
    });

    it('calls onVisible when the page is visible', () => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: false });
      const onVisible = vi.fn();
      const onHidden = vi.fn();
      const cleanup = pageVisibilityListener(onVisible, onHidden);

      document.dispatchEvent(new Event('visibilitychange'));
      expect(onVisible).toHaveBeenCalledTimes(1);
      expect(onHidden).not.toHaveBeenCalled();

      cleanup();
    });

    it('calls onHidden when the page is hidden', () => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      const onVisible = vi.fn();
      const onHidden = vi.fn();
      const cleanup = pageVisibilityListener(onVisible, onHidden);

      document.dispatchEvent(new Event('visibilitychange'));
      expect(onHidden).toHaveBeenCalledTimes(1);
      expect(onVisible).not.toHaveBeenCalled();

      cleanup();
    });

    it('cleanup removes the listener', () => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: false });
      const onVisible = vi.fn();
      const cleanup = pageVisibilityListener(onVisible);

      document.dispatchEvent(new Event('visibilitychange'));
      cleanup();
      cleanup();
      document.dispatchEvent(new Event('visibilitychange'));
      expect(onVisible).toHaveBeenCalledTimes(1);
    });

    it('tabFocusListener is a deprecated alias of pageVisibilityListener', () => {
      expect(tabFocusListener).toBe(pageVisibilityListener);
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

    it('never treats hash content as search params', () => {
      expect(getQueryParams('https://example.com/path#section?fake=value')).toEqual({});
      expect(getQueryParams('https://example.com/path?foo=bar#section')).toEqual({ foo: 'bar' });
    });

    it('returns an empty object for invalid URLs', () => {
      expect(getQueryParams('http://[')).toEqual({});
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

    it('matches dotted cookie names exactly and does not treat names as regex', () => {
      setCookie('axb', 'wildcard');
      expect(getCookie('a.b')).toBeNull();

      setCookie('a.b', 'dotted');
      expect(getCookie('a.b')).toBe('dotted');
      expect(getCookie('axb')).toBe('wildcard');

      deleteCookie('axb');
      deleteCookie('a.b');
    });

    it('looks up encoded names and names containing regex metacharacters exactly', () => {
      setCookie('user name', 'alice');
      setCookie('café', 'latte');
      setCookie('fo', 'oops');
      setCookie('foo*', 'star');

      expect(getCookie('user name')).toBe('alice');
      expect(getCookie('café')).toBe('latte');
      expect(getCookie('foo*')).toBe('star');
      expect(getCookie('fo')).toBe('oops');

      deleteCookie('user name');
      deleteCookie('café');
      deleteCookie('fo');
      deleteCookie('foo*');
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
