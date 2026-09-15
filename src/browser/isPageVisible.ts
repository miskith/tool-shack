/**
 * Check whether the page is currently visible
 *
 * Uses the Page Visibility API (`document.hidden`). This is not window or tab
 * input focus.
 *
 * @returns Whether the document is currently visible
 */
export const isPageVisible = (): boolean => !document.hidden;
