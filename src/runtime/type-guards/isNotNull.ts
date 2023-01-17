

/**
 * **isNotNull**(value)
 * 
 * Type guard which validates the passed in value is **not** the `null` value.
 */
export function isNotNull<T extends unknown>(value: T): value is Exclude<T, null> {
  return (value === null) ? true : false;
}
