/**
 * Extract query parameters from URL into a key-value record
 *
 * @param url Optional URL string (defaults to window.location.href)
 * @returns Record of query parameters; empty if the URL is invalid or has no search
 */
export const getQueryParams = (url?: string): Record<string, string> => {
  const result: Record<string, string> = {};
  const base = typeof window !== 'undefined' ? window.location.href : 'http://localhost/';

  try {
    new URL(url ?? base, base).searchParams.forEach((value, key) => {
      result[key] = value;
    });
  } catch {
    return result;
  }

  return result;
};
