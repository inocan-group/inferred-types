import type { Thenable } from "inferred-types/types";
import { isDictionary } from "inferred-types/runtime";
/**
 * type guard which checks whether passed in `val` is a `Thenable` object
 */
export function isThenable(val: unknown): val is Thenable {
    return isDictionary(val) && "then" in val && "catch" in val && typeof val.then === "function";
}
