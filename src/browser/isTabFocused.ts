/**
 * Check if current browser tab is in focus
 *
 * @returns Boolean indicating if current browser tab is in focus
 */
export const isTabFocused = (): boolean => !document.hidden;
