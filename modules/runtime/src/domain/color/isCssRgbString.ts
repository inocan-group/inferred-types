import { CssRgb } from "inferred-types/types";
import { isString } from "runtime/type-guards";

/**
 * **isCssRgbString**`(val)`
 *
 * A type guard that tests whether `val` is a CSS RGB
 * color value (e.g., `CssRgb`).
 */
export function isCssRgbString(val: unknown): val is CssRgb {
    return isString(val) && val.startsWith("rgb(")
}
