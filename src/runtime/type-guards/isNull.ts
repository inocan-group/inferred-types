
/**
 * **isNull**(value)
 * 
 * Type guard which checks whether a value is null or not.
 * 
 * **Related:** `ifNull`
 */
export function isNull<T extends unknown>(value: T): value is T & null {
  return (value === null) ? true : false;
}
