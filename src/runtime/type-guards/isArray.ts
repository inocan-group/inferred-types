
/**
 * **isArray**(value)
 * 
 * Type guard to detect if the type is an array (readonly or regular)
 */
export function isArray<T>(value: T): value is Exclude<T, unknown | null | string | number | boolean> & unknown[] {
  return Array.isArray(value) === true;
}
