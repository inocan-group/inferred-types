/**
 * **isNull**(value)
 *
 * Type guard which checks whether a value is null or not.
 *
 * **Related:** `ifNull`
 */
export function isNull<T>(value: T): value is T & null {
    return (value === null);
}
