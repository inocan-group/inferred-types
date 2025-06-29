/**
 * **isError**`(val)`
 *
 * Type guard which checks whether the value passed in is an
 * instance of `Error`.
 */
export function isError(val: unknown): val is Error {
    return val instanceof Error;
}
