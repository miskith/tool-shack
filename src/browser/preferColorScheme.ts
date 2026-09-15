/**
 * Check if user prefers light color scheme
 *
 * @returns Boolean indicating if user prefers light color scheme
 */
export const preferLightColorScheme = (): boolean =>
  !!window.matchMedia('(prefers-color-scheme: light)').matches;

/**
 * Check if user prefers dark color scheme
 *
 * @returns Boolean indicating if user prefers dark color scheme
 */
export const preferDarkColorScheme = (): boolean =>
  !!window.matchMedia('(prefers-color-scheme: dark)').matches;

/**
 * Check what color scheme the user prefers
 *
 * Returns `'light'` when `(prefers-color-scheme: light)` matches; otherwise `'dark'`.
 *
 * @returns `'light'` or `'dark'`
 */
export const preferColorScheme = (): 'light' | 'dark' =>
  preferLightColorScheme() ? 'light' : 'dark';
