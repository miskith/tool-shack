import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { dateAsIso, isSameDay, parseDuration, timeAgo } from '../src/dateTime/index.js';

describe('dateTime utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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

  describe('isSameDay', () => {
    it('returns true for matching calendar day regardless of time', () => {
      const morning = new Date('2026-06-15T08:00:00');
      const evening = new Date('2026-06-15T23:59:59');
      expect(isSameDay(morning, evening)).toBe(true);
    });

    it('returns false for different days', () => {
      const day1 = new Date('2026-06-15T08:00:00');
      const day2 = new Date('2026-06-16T08:00:00');
      expect(isSameDay(day1, day2)).toBe(false);
    });

    it('handles string date and timestamp inputs', () => {
      expect(isSameDay('2026-06-15', '2026-06-15')).toBe(true);
      expect(isSameDay(new Date('2026-06-15').getTime(), '2026-06-15')).toBe(true);
    });
  });

  describe('timeAgo', () => {
    it('formats past and future relative time strings', () => {
      const now = new Date('2026-06-15T12:00:00Z').getTime();

      // Seconds
      expect(timeAgo(new Date(now - 10 * 1000))).toBe('10 seconds ago');
      // Minutes
      expect(timeAgo(new Date(now - 5 * 60 * 1000))).toBe('5 minutes ago');
      // Hours
      expect(timeAgo(new Date(now - 3 * 3600 * 1000))).toBe('3 hours ago');
      // Days
      expect(timeAgo(new Date(now - 2 * 86400 * 1000))).toBe('2 days ago');
      // Months
      expect(timeAgo(new Date(now - 60 * 86400 * 1000))).toBe('2 months ago');
      // Years
      expect(timeAgo(new Date(now - 400 * 86400 * 1000))).toBe('last year');
      expect(timeAgo(new Date(now - 800 * 86400 * 1000))).toBe('2 years ago');

      // Future
      expect(timeAgo(new Date(now + 10 * 60 * 1000))).toBe('in 10 minutes');
    });
  });
});
