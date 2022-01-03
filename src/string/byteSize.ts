/**
 * Return size of string in bytes
 *
 * @param value String to be sized
 * @returns Byte size of given string
 */
export const byteSize = (value: string): number => new Blob([value]).size;
