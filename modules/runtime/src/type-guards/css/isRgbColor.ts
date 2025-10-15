import type { RgbColor } from "inferred-types/types";
import { isString } from "runtime/type-guards";

/**
 * **isRgbColor**`(val) -> is RgbColor`
 *
 * Typeguard that validates that `val` is a valid RbgColor (e.g.,
 * `rgb(127,0,0)`)
 */
export function isRgbColor(val: unknown): val is RgbColor {
    return isString(val) && val.startsWith("rgb(") && val.endsWith(")");
}
