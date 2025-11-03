import type { HexColor } from "inferred-types/types";
import { HEXADECIMAL_CHAR } from "inferred-types/constants";
import { afterFirst, asChars, isString } from "inferred-types/runtime";

/**
 * **isHexColor**`(val)`
 *
 * Type guard which tests whether `val` is a hexadecimal color value (`HexColor`).
 *
 * **Related:**
 * - `isCssRgbString()`, `isRgbObject()`, `isRgbaObject()`
 */
export function isHexColor(val: unknown): val is HexColor {
    return isString(val)
        && val.startsWith("#")
        && afterFirst(asChars(val)).every(i => HEXADECIMAL_CHAR.includes(i));
}
