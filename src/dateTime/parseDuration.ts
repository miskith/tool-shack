import { IDuration } from './interfaces/parseDuration';

/**
 * Parse duration in milliseconds into days, hours, minutes, seconds, milliseconds
 *
 * @param durationInMs Integer of duration in milliseconds
 * @returns Object containing days, hours, minutes, seconds and milliseconds of provided duration
 */
export const parseDuration = (durationInMs: number): IDuration => {
  durationInMs = Math.abs(durationInMs);

  return {
    days: Math.floor(durationInMs / (24 * 60 * 60 * 1000)),
    hours: Math.floor(durationInMs / (60 * 60 * 1000)) % 24,
    minutes: Math.floor(durationInMs / (60 * 1000)) % 60,
    seconds: Math.floor(durationInMs / 1000) % 60,
    milliseconds: Math.floor(durationInMs) % 1000,
  };
}
