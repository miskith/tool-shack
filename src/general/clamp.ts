/**
 * Clamp a number between min and max bounds
 *
 * @param value Number to clamp
 * @param min Minimum boundary
 * @param max Maximum boundary
 * @returns Clamped value
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
