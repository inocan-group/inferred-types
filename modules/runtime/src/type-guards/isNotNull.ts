/**
 * **isNotNull**(value)
 *
 * Type guard which validates the passed in value is **not** the `null` value.
 */
export function isNotNull<T>(value: T): value is T & IsNot<T, null> {
    return (value === null);
}
