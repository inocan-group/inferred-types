/**
 * **isOk**`(val): val is Exclude<typeof val, Error>`
 *
 * A typeguard which validates that `val` is NOT an error.
 */
export function isOk<T>(val: T): val is Exclude<T, Error> {
    return val instanceof Error === false;
}
