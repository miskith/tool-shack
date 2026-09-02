/**
 * Extract query parameters from URL into a key-value record
 *
 * @param url Optional URL string (defaults to window.location.href)
 * @returns Record of query parameters
 */
export const getQueryParams = (url?: string): Record<string, string> => {
  let search = url
    ? url.includes('?')
      ? url.substring(url.indexOf('?'))
      : ''
    : typeof window !== 'undefined'
      ? window.location.search
      : '';

  if (search.includes('#')) {
    search = search.substring(0, search.indexOf('#'));
  }

  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
};
