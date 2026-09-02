import { camelCase } from './camelCase.js';
import { capitalize } from './capitalize.js';

/**
 * Convert string to PascalCase
 *
 * @param value String to convert
 * @returns PascalCase string
 */
export const pascalCase = (value: string): string => capitalize(camelCase(value));
