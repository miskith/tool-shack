import { IDuration } from './interfaces/parseDuration';

export const parseDuration = (durationInMs: number): IDuration => {
  durationInMs = Math.abs(durationInMs);

  return {
    day: Math.floor(durationInMs / (24 * 60 * 60 * 1000)),
    hour: Math.floor(durationInMs / (60 * 60 * 1000)) % 24,
    minute: Math.floor(durationInMs / (60 * 1000)) % 60,
    second: Math.floor(durationInMs / 1000) % 60,
    millisecond: Math.floor(durationInMs) % 1000,
  };
}
