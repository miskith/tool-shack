/**
 * Copy text to clipboard using Clipboard API with textarea fallback
 *
 * @param text String text to copy
 * @returns Promise resolving to boolean indicating success
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback below
  }

  try {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = text;
    tempTextarea.style.position = 'fixed';
    tempTextarea.style.opacity = '0';
    tempTextarea.style.pointerEvents = 'none';
    document.body.appendChild(tempTextarea);

    try {
      tempTextarea.focus();
      tempTextarea.select();
      return document.execCommand('copy');
    } finally {
      document.body.removeChild(tempTextarea);
    }
  } catch {
    return false;
  }
};
