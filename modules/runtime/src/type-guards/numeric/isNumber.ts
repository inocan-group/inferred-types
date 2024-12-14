/**
 * **isNumber**(value)
 *
 * Type guard to test whether passed in value is a numeric type.
 */
export function isNumber<T>(value: T): value is T & number {
  return (typeof value === "number");
}
