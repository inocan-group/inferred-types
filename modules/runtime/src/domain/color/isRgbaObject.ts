

import { indexOf } from "inferred-types/runtime";
import { RGBA } from "inferred-types/types";
import { endsWith, isString } from "runtime/type-guards";

/**
 * **isRGBAObject**`(val)`
 *
 * A type guard that tests whether `val` is RGBA object.
 */
export function isRgbaObject(val: unknown): val is RGBA {
    return isString(val)
        && val.startsWith("rgba(")
        && val.endsWith(")")
        && typeof indexOf(val, "r") === "number"
        && typeof indexOf(val, "g") === "number"
        && typeof indexOf(val, "b") === "number"
        && typeof indexOf(val, "a") === "number"
}
