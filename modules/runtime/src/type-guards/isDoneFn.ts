import type { AsDoneFn } from "inferred-types/types";
import { isDictionary } from "inferred-types/runtime";

/**
 * **isDoneFn**(val)
 *
 * A type guard which checks whether the value passed in has a `done`
 * property which is a function.
 */
export function isDoneFn<T>(val: T): val is AsDoneFn<T> {
    return isDictionary(val) && "done" in val && typeof val.done === "function";
}
