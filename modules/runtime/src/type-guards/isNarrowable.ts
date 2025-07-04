import type { Narrowable } from "inferred-types/types";
import { isBoolean, isNull, isNumber, isDictionary, isString, isSymbol, isUndefined } from "inferred-types/runtime";

/**
 * type guard which validates that `val` is `Narrowable`
 */
export function isNarrowable(val: unknown): val is Narrowable {
    return isString(val) || isNumber(val) || isBoolean(val) || isSymbol(val) || isDictionary(val) || isNull(val) || isUndefined(val);
}
