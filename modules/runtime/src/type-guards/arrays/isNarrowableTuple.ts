import type { Narrowable } from "inferred-types/types";
import { isArray, isBoolean, isNull, isNumber, isDictionary, isString, isUndefined } from "inferred-types/runtime";

export function isNarrowableTuple(val: unknown): val is readonly Narrowable[] {
    return isArray(val) && (
        val.every(
            i => isString(i) || isNumber(i) || isDictionary(i) || isNull(i) || isUndefined(i) || isBoolean(i) || typeof i === "symbol"
        )
    );
}
