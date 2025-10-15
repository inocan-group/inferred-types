import type { CssNamedColor } from "inferred-types/types";
import { CSS_NAMED_COLORS } from "inferred-types/constants";
import { isString } from "runtime/type-guards";

/**
 * **isNamedColor**`(val) -> is CssNamedColor`
 *
 * Typeguard to validate that `val` is a CSS/HTML Named Color.
 *
 * - to match you must make sure the string name is lowercase
 */
export function isNamedColor(val: unknown): val is CssNamedColor {
    return isString(val) && CSS_NAMED_COLORS.includes(val as any);
}
