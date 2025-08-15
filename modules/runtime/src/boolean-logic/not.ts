import type { IsFalsy, Narrowable } from "inferred-types/types";
import { isFalsy } from "runtime/type-guards";

/**
 * **not**`(val)`
 *
 * Returns the inverse of the value's truthy/falsy value.
 */
export function not<T extends Narrowable>(
    val: T
): [IsFalsy<T>] extends [true] ? true : false {
    return (
        !!isFalsy(val)
    ) as [IsFalsy<T>] extends [true] ? true : false;
}
