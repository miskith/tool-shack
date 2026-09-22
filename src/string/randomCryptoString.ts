const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generate cryptographically secure random string using crypto.getRandomValues
 *
 * @param length Desired length of random string
 * @param charset Character set to use (defaults to alphanumeric)
 * @returns Cryptographically secure random string
 */
export const randomCryptoString = (length = 16, charset: string = DEFAULT_CHARSET): string => {
  const charsetLength = charset.length;
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let result = '';
  for (const value of randomValues) {
    result += charset.charAt(value % charsetLength);
  }

  return result;
};
