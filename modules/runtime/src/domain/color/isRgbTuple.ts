import { RgbTuple } from "inferred-types/types";
import {  isNumericArray } from "runtime/type-guards";

/**
 * **isRgbTuple**`(val)`
 *
 * A type guard which tests whether `val` is a tuple of valid RGB values.
 *
 * - must have precisely three values `[ number, number, number ]`
 * - the numbers must all be between 0-255
 *
 * **Related:**
 * - `isCssRgbString()`, `isCssRgbaString()`
 * - `isHexColor()`, `isRgbObject()`, `isRgbaObject()`
 */
export function isRgbTuple(val: unknown): val is RgbTuple {
    return isNumericArray(val) && val.length === 3 && val.every(i => i >= 0 && i <= 255 )
}
