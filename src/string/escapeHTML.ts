export const escapeHTML = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerText = html;

  return tempDiv.innerHTML;
}
