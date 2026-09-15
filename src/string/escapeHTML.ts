/**
 * Encode `&`, `<`, `>`, `"`, and `'` as HTML entities for ordinary text content or quoted attributes.
 *
 * This is not an HTML sanitizer and is not safe for script, style, URL, or unquoted-attribute contexts.
 *
 * @param html String that may contain HTML-significant characters
 * @returns String with `&`, `<`, `>`, `"`, and `'` replaced by HTML entities
 */
export const escapeHTML = (html: string): string =>
  html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
