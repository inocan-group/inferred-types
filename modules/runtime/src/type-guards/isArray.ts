/**
 * **isArray**(value)
 *
 * Type guard to detect if the type is an array (readonly or regular)
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value) === true;
}
