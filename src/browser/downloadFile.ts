/**
 * Programmatically download a file in browser
 *
 * @param data File content as string or Blob
 * @param filename Desired filename
 * @param mimeType Optional MIME type when data is string (default 'text/plain')
 * @returns void
 */
export const downloadFile = (
  data: string | Blob,
  filename: string,
  mimeType = 'text/plain',
): void => {
  const blob = typeof data === 'string' ? new Blob([data], { type: mimeType }) : data;
  const url = URL.createObjectURL(blob);
  const tempLink = document.createElement('a');

  tempLink.href = url;
  tempLink.download = filename;
  tempLink.style.display = 'none';

  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);

  URL.revokeObjectURL(url);
};
