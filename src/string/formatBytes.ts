/**
 * Format bytes into human-readable string representation (e.g. "1.5 MB")
 *
 * @param bytes Number of bytes
 * @param decimals Number of decimal places to include (default 2)
 * @returns Formatted byte string
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes <= 0 || isNaN(bytes)) {
    return '0 Bytes';
  }

  const k = 1024;
  const decimalCount = Math.max(0, decimals);
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);

  const value = bytes / Math.pow(k, index);
  return `${parseFloat(value.toFixed(decimalCount))} ${sizes[index]}`;
};
