import { describe, it, expect, vi } from 'vitest';
import { runAnimation } from '../src/schedule/index.js';

describe('schedule utilities', () => {
  describe('runAnimation', () => {
    it('starts animation loop and allows stopping', () => {
      let rafCount = 0;
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
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
