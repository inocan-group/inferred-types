
/**
 * **isArray**(value)
 * 
 * Type guard to detect if the type is an array (readonly or regular)
 */
export function isArray<T>(value: T): value is T & any[] {
  return Array.isArray(value) === true;
}
