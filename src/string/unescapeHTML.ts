/**
 * Unescape HTML entities back into plain characters
 *
 * @param html HTML string containing entities
 * @returns Unescaped plain text
 */
export const unescapeHTML = (html: string): string => {
  const tempTextarea = document.createElement('textarea');
  tempTextarea.innerHTML = html;

  return tempTextarea.value;
};
