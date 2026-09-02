import { describe, it, expect, vi } from 'vitest';
import {
  isPushNotificationSupported,
  isScrollBehaviorSupported,
  isShareSupported,
  isTabFocused,
  isTouchSupported,
  preferColorScheme,
  preferDarkColorScheme,
  preferLightColorScheme,
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
});
