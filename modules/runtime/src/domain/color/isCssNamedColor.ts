import { CSS_NAMED_COLORS } from "inferred-types/constants";
import { CssNamedColor } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * **isCssNamedColor**`(val)`
 *
 * Type guard which tests whether `val` is a string literal that matches
 * one of the "named colors" in CSS.
 */
export function isCssNamedColor(val: unknown): val is CssNamedColor {
    return isString(val) && CSS_NAMED_COLORS.includes(val as any);
}
