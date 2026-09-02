/**
 * Copy text to clipboard using Clipboard API with textarea fallback
 *
 * @param text String text to copy
 * @returns Promise resolving to boolean indicating success
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
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
    tempTextarea.focus();
    tempTextarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    return success;
  } catch {
    return false;
  }
};
