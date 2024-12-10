/**
 * **isBoolean**(value)
 *
 * Type guard which validates that type is a boolean value.
 */
export function isBoolean<T>(value: T): value is T & boolean {
  return typeof value === "boolean";
}
