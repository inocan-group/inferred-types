import { RGB } from "inferred-types/types";
import { indexOf } from "runtime/lists";
import { isString } from "runtime/type-guards";

/**
 * **isRgbObject**`(val)`
 *
 * A type guard that tests whether `val` is RGB object.
 */
export function isRgbObject(val: unknown): val is RGB {
    return isString(val)
        && val.startsWith("rgb(")
        && val.endsWith(")")
        && typeof indexOf(val, "r") === "number"
        && typeof indexOf(val, "g") === "number"
        && typeof indexOf(val, "b") === "number"
        && indexOf(val,"a") === undefined

}
