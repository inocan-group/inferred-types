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
        && isString(val[0])
        && val[0].length === 1
        && (
            ( isString(val[1]) && val[1].length === 1 )
            || isUndefined(val[1])
        )
}
