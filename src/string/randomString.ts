const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generate random string using Math.random
 *
 * @param length Desired length of random string
 * @param charset Character set to use (defaults to alphanumeric)
 * @returns Random string
 */
export const randomString = (length = 16, charset: string = DEFAULT_CHARSET): string => {
  let result = '';
  const charsetLength = charset.length;
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charsetLength));
  }

  return result;
};
