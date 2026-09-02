import { describe, it, expect, vi } from 'vitest';
import {
  createElement,
  addEventListener,
  addClickOutsideListener,
  appendBefore,
  appendAfter,
  copyToClipboard,
  fireEvent,
  getElementOffset,
  isInViewport,
  toggleFullscreen,
  toggleFullscreenWithFallback,
  waitForElement,
} from '../src/dom/index.js';

describe('dom utilities', () => {
  describe('createElement', () => {
    it('creates element with attributes, styles, dataset, aria and children', () => {
      const clickHandler = vi.fn();
      const child = document.createElement('span');
      child.textContent = 'Icon';

      const el = createElement<HTMLButtonElement>('button', {
        className: 'btn-test',
        style: { color: 'red' },
        dataset: { action: 'submit' },
        aria: { label: 'Submit form' },
        role: 'button',
        listeners: { click: clickHandler },
        children: ['Click Me ', child],
      });

      expect(el.tagName).toBe('BUTTON');
      expect(el.className).toBe('btn-test');
      expect(el.style.color).toBe('red');
      expect(el.dataset.action).toBe('submit');
      expect(el.getAttribute('aria-label')).toBe('Submit form');
      expect(el.getAttribute('role')).toBe('button');
      expect(el.textContent).toBe('Click Me Icon');

      el.click();
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it('creates basic element without props', () => {
      const div = createElement('div');
      expect(div.tagName).toBe('DIV');
    });
  });

  describe('addEventListener', () => {
    it('attaches listeners to single element', () => {
      const el = document.createElement('button');
      const clickSpy = vi.fn();
      addEventListener(el, { click: clickSpy });

      el.click();
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('attaches listeners to an array of elements', () => {
      const btn1 = document.createElement('button');
      const btn2 = document.createElement('button');
      const clickSpy = vi.fn();

      addEventListener([btn1, btn2], { click: clickSpy });

      btn1.click();
      btn2.click();
      expect(clickSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('addClickOutsideListener', () => {
    it('triggers callback only when clicking outside element', () => {
      const parent = document.createElement('div');
      const target = document.createElement('div');
      const outside = document.createElement('div');
      parent.appendChild(target);
      parent.appendChild(outside);
      document.body.appendChild(parent);

      const callback = vi.fn();
      addClickOutsideListener(target, callback);

      // Click inside
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(callback).not.toHaveBeenCalled();

      // Click outside
      outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(callback).toHaveBeenCalledTimes(1);

      document.body.removeChild(parent);
    });
  });

  describe('appendBefore and appendAfter', () => {
    it('appends element before and after reference node', () => {
      const parent = document.createElement('div');
      const ref = document.createElement('span');
      ref.textContent = 'Middle';
      parent.appendChild(ref);

      const before = document.createElement('span');
      before.textContent = 'Before';
      const after = document.createElement('span');
      after.textContent = 'After';

      appendBefore(before, ref);
      appendAfter(after, ref);

      expect(parent.children[0].textContent).toBe('Before');
      expect(parent.children[1].textContent).toBe('Middle');
      expect(parent.children[2].textContent).toBe('After');
    });
  });

  describe('fireEvent', () => {
    it('dispatches custom event on element', () => {
      const el = document.createElement('div');
      const handler = vi.fn();
      el.addEventListener('custom-event', handler);

      fireEvent(el, 'custom-event');
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('getElementOffset', () => {
    it('computes offset using bounding client rect and page offset', () => {
      const el = document.createElement('div');
      vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
        top: 50,
        left: 30,
        bottom: 150,
        right: 130,
        width: 100,
        height: 100,
        x: 30,
        y: 50,
        toJSON: () => {},
      });

      const offset = getElementOffset(el);
      expect(offset.top).toBe(50);
      expect(offset.left).toBe(30);
    });
  });

  describe('isInViewport', () => {
    it('detects whether element is inside visible viewport', () => {
      const el = document.createElement('div');
      Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
      Object.defineProperty(window, 'innerWidth', { value: 1200, configurable: true });

      vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
        top: 100,
        bottom: 200,
        left: 50,
        right: 150,
        width: 100,
        height: 100,
        x: 50,
        y: 100,
        toJSON: () => {},
      });
      expect(isInViewport(el)).toBe(true);

      vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
        top: 1000,
        bottom: 1100,
        left: 50,
        right: 150,
        width: 100,
        height: 100,
        x: 50,
        y: 1000,
        toJSON: () => {},
      });
      expect(isInViewport(el)).toBe(false);
      expect(isInViewport(el, 300)).toBe(true);
    });
  });

  describe('toggleFullscreen', () => {
    it('requests and exits fullscreen mode', async () => {
      const el = document.createElement('div');
      el.requestFullscreen = vi.fn().mockResolvedValue(undefined);
      document.exitFullscreen = vi.fn().mockResolvedValue(undefined);

      // Enter fullscreen
      Object.defineProperty(document, 'fullscreenElement', {
        value: null,
        writable: true,
        configurable: true,
      });
      await toggleFullscreen(el);
      expect(el.requestFullscreen).toHaveBeenCalledTimes(1);

      // Exit fullscreen
      Object.defineProperty(document, 'fullscreenElement', {
        value: el,
        writable: true,
        configurable: true,
      });
      await toggleFullscreen(el);
      expect(document.exitFullscreen).toHaveBeenCalledTimes(1);
    });
  });

  describe('toggleFullscreenWithFallback', () => {
    it('uses native fullscreen when supported', async () => {
      const el = document.createElement('div');
      el.requestFullscreen = vi.fn().mockResolvedValue(undefined);
      document.exitFullscreen = vi.fn().mockResolvedValue(undefined);

      Object.defineProperty(document, 'fullscreenElement', {
        value: null,
        writable: true,
        configurable: true,
      });

      const entered = await toggleFullscreenWithFallback(el);
      expect(entered).toBe(true);
      expect(el.requestFullscreen).toHaveBeenCalledTimes(1);

      Object.defineProperty(document, 'fullscreenElement', {
        value: el,
        writable: true,
        configurable: true,
      });

      const exited = await toggleFullscreenWithFallback(el);
      expect(exited).toBe(false);
      expect(document.exitFullscreen).toHaveBeenCalledTimes(1);
    });

    it('falls back to fixed CSS pseudo-fullscreen when native API is missing', async () => {
      const el = document.createElement('div');
      // No requestFullscreen on element (simulating iOS Safari)
      // @ts-expect-error simulate unsupported
      el.requestFullscreen = undefined;

      const entered = await toggleFullscreenWithFallback(el, { zIndex: 10000 });
      expect(entered).toBe(true);
      expect(el.style.position).toBe('fixed');
      expect(el.style.width).toBe('100vw');
      expect(el.style.height).toBe('100vh');
      expect(el.style.zIndex).toBe('10000');

      const exited = await toggleFullscreenWithFallback(el);
      expect(exited).toBe(false);
      expect(el.style.position).toBe('');
      expect(el.style.zIndex).toBe('');
    });

    it('supports custom CSS class for pseudo-fullscreen fallback', async () => {
      const el = document.createElement('div');
      // @ts-expect-error simulate unsupported
      el.requestFullscreen = undefined;

      await toggleFullscreenWithFallback(el, { className: 'is-fullscreen-custom' });
      expect(el.classList.contains('is-fullscreen-custom')).toBe(true);

      await toggleFullscreenWithFallback(el, { className: 'is-fullscreen-custom' });
      expect(el.classList.contains('is-fullscreen-custom')).toBe(false);
    });
  });

  describe('copyToClipboard', () => {
    it('uses navigator.clipboard.writeText if available', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: writeTextMock },
        configurable: true,
      });

      const result = await copyToClipboard('test copy');
      expect(result).toBe(true);
      expect(writeTextMock).toHaveBeenCalledWith('test copy');
    });

    it('falls back to document.execCommand when clipboard API is unavailable', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        configurable: true,
      });
      document.execCommand = vi.fn().mockReturnValue(true);

      const result = await copyToClipboard('fallback copy');
      expect(result).toBe(true);
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });
  });

  describe('waitForElement', () => {
    it('resolves immediately if element already exists', async () => {
      const div = document.createElement('div');
      div.className = 'existing-item';
      document.body.appendChild(div);

      const found = await waitForElement('.existing-item');
      expect(found).toBe(div);

      document.body.removeChild(div);
    });

    it('resolves when element is added dynamically', async () => {
      const promise = waitForElement('.dynamic-item');

      const el = document.createElement('div');
      el.className = 'dynamic-item';
      setTimeout(() => {
        document.body.appendChild(el);
      }, 50);

      const found = await promise;
      expect(found).toBe(el);

      document.body.removeChild(el);
    });

    it('rejects on timeout if element never appears', async () => {
      await expect(waitForElement('.non-existent', 50)).rejects.toThrow(
        /Timeout waiting for element/,
      );
    });
  });
});
