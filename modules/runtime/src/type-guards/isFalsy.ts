import type { FalsyValue } from "inferred-types/types";
import { FALSY_VALUES } from "inferred-types/constants";
import { isNumber } from "runtime/type-guards";

/**
 * **isFalsy**()
 *
 * a TypeGuard which checks whether a value is considered _falsy_ in
 * Javascript.
 */
export function isFalsy<V>(val: V): val is V & FalsyValue {
    return FALSY_VALUES.includes(val as any) || (
        isNumber(val) && Number.isNaN(val)
    );
}
