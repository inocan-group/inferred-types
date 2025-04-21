import { isError } from "inferred-types/runtime";

/**
 * type guard which validates that `val` is _not_ an `Error` type.
 */
export function isNotError(val: unknown): val is Exclude<unknown, Error> {
    return !isError(val);
}
