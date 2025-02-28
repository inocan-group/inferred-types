/**
 * **isTrue**(value)
 *
 * Type guard which detects whether the given value is `true`.
 */
export function isTrue(value: unknown): value is true {
    return value === true;
}
