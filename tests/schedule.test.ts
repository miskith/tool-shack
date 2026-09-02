import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce, retry, runAnimation, sleep, throttle } from '../src/schedule/index.js';

describe('schedule utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('debounce', () => {
    it('delays invoking fn until delay has elapsed', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 200);

      debounced('a');
      debounced('b');
      debounced('c');

      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(199);
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith('c');
    });

    it('cancels pending invocation', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 200);

      debounced('a');
      debounced.cancel();

      vi.advanceTimersByTime(300);
      expect(fn).not.toHaveBeenCalled();
    });
  });

  describe('throttle', () => {
    it('throttles invocations to at most once per limit window', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 200);

      throttled(1);
      expect(fn).toHaveBeenCalledWith(1);
      expect(fn).toHaveBeenCalledTimes(1);

      throttled(2);
      throttled(3);
      expect(fn).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(200);
      expect(fn).toHaveBeenCalledTimes(2);
      expect(fn).toHaveBeenCalledWith(3);
    });

    it('cancels pending trailing call', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 200);

      throttled(1);
      throttled(2);
      throttled.cancel();

      vi.advanceTimersByTime(300);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('sleep', () => {
    it('resolves after specified milliseconds', async () => {
      const promise = sleep(500);
      let resolved = false;
      promise.then(() => {
        resolved = true;
      });

      expect(resolved).toBe(false);
      await vi.advanceTimersByTimeAsync(500);
      expect(resolved).toBe(true);
    });
  });

  describe('retry', () => {
    it('resolves immediately on first success', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const result = await retry(fn, { retries: 2, delay: 100 });

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('retries until success within retry limit', async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('fail 1'))
        .mockRejectedValueOnce(new Error('fail 2'))
        .mockResolvedValue('eventual success');

      const promise = retry(fn, { retries: 3, delay: 50, backoff: false });
      await vi.advanceTimersByTimeAsync(200);
      const result = await promise;

      expect(result).toBe('eventual success');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('throws last error after exceeding max retries', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('permanent error'));

      const promise = retry(fn, { retries: 2, delay: 50, backoff: false });
      const expectation = expect(promise).rejects.toThrow('permanent error');
      await vi.advanceTimersByTimeAsync(200);
      await expectation;

      expect(fn).toHaveBeenCalledTimes(3);
    });
  });

  describe('runAnimation', () => {
    it('starts animation loop and allows stopping', () => {
      let rafCount = 0;
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => {
        rafCount++;
        return rafCount;
      });
      const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

      const fn = vi.fn();
      const { stopAnimation, startAnimation } = runAnimation(fn, true);

      expect(window.requestAnimationFrame).toHaveBeenCalled();

      stopAnimation();
      expect(cancelSpy).toHaveBeenCalled();

      // Start again
      startAnimation();
      expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2);

      stopAnimation();
    });
  });
});
