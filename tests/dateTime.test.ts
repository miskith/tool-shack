import { describe, it, expect } from 'vitest';
import { dateAsIso, parseDuration } from '../src/dateTime/index.js';

describe('dateTime utilities', () => {
  describe('parseDuration', () => {
    it('parses milliseconds into days, hours, minutes, seconds, milliseconds', () => {
      // 1 day + 2 hours + 3 mins + 4 secs + 5 ms
      const ms = 1 * 86400000 + 2 * 3600000 + 3 * 60000 + 4 * 1000 + 5;
      expect(parseDuration(ms)).toEqual({
        days: 1,
        hours: 2,
        minutes: 3,
        seconds: 4,
        milliseconds: 5,
      });
    });

    it('handles zero duration', () => {
      expect(parseDuration(0)).toEqual({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    it('handles negative durations using absolute value', () => {
      expect(parseDuration(-65000)).toEqual({
        days: 0,
        hours: 0,
        minutes: 1,
        seconds: 5,
        milliseconds: 0,
      });
    });
  });

  describe('dateAsIso', () => {
    it('formats date to ISO string with timezone offset', () => {
      const date = new Date(2026, 0, 15, 14, 30, 45);
      const iso = dateAsIso(date);
      expect(iso).toMatch(/^2026-01-15T14:30:45[+-]\d{2}:\d{2}$/);
    });
  });
});
