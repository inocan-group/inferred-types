import type { FalsyValue } from "inferred-types/types";
import { FALSY_VALUES } from "inferred-types/constants";

/**
 * **isTruthy**
 *
 * Creates a TypeGuard which checks whether a value is considered _truthy_
 * in Javascript.
 */
export function isTruthy<V>(val: V): val is Exclude<V, FalsyValue> {
    return !FALSY_VALUES.includes(val as any);
}
