import type { InputToken } from "inferred-types/types";
import {
    isDefineObject,
    isDefineTuple,
    isInputToken__String
} from "inferred-types/runtime";

/**
 * **isInputToken**`(val)`
 *
 * A type guard which validates that `val` is a valid `InputToken`. This token
 * can be:
 *
 * - a string definition of an `InputToken` (e.g., `"string"`, `"string | number"`, etc.)
 * - a tuple definition (e.g., `DefineTuple`)
 * - an object definition (e.g., `DefineObject`)
 */
export function isInputToken(val: unknown): val is InputToken {
    return isInputToken__String(val) || isDefineObject(val) || isDefineTuple(val);
}
