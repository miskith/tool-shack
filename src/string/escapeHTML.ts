/**
 * Escape special HTML related characters from string
 *
 * @param html String containing HTML related characters
 * @returns Safe string with escaped HTML related characters
 */
export const escapeHTML = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerText = html;

  return tempDiv.innerHTML;
}
