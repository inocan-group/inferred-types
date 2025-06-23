import { isSymbol, isBoolean, isString, isNumber, isUndefined, isObject, isNull } from "inferred-types/runtime";
import { Narrowable } from "inferred-types/types";



/**
 * type guard which validates that `val` is `Narrowable`
 */
export function isNarrowable(val: unknown): val is Narrowable {
    return isString(val) || isNumber(val) || isBoolean(val) || isSymbol(val) || isObject(val) || isNull(val) || isUndefined(val);
}
