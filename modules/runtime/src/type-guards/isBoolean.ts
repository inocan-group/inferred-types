/**
 * **isBoolean**(value)
 *
 * Type guard which validates that type is a boolean value.
 *
 * **Related:** `isBooleanLike()`
 */
export function isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
}
