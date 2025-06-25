import { NestingTuple } from "inferred-types/types";
import { isArray, isString, isUndefined } from "inferred-types/runtime";

/**
 * type-guard which validates that `val` is a `NestingTuple`
 *
 * **Related:** `IsNestingTuple<T>`
 */
export function isNestingTuple(val: unknown): val is NestingTuple {
    return isArray(val)
        && val.length === 2
        && isArray(val[0])
        && val[0].every(isString)
        && (
            (isArray(val[1]) && val[1].every(isString))
            || isUndefined(val[1])
        )
}
