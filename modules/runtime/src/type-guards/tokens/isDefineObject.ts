import type {
    DefineObject
} from "inferred-types/types";
import {
    isDictionary,
    isInputToken,

} from "inferred-types/runtime";

import { isDefineTuple } from "runtime/type-guards/tokens/isDefineTuple";

/**
 * **isDefineObject**`(val)`
 *
 * a type-guard which validates that `val` is a `DefineObject` type. This requires that:
 *
 * - `val` be a dictionary object
 * - all _values_ of `val`'s keys must be an `InputToken` (string or otherwise)
 */
export function isDefineObject(val: unknown): val is DefineObject {
    return isDictionary(val)
        ? Object.values(val).every(i => isInputToken(i) || isDefineObject(i) || isDefineTuple(i))
        : false;
}
