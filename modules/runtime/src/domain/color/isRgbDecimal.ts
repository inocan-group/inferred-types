import { RgbDecimalString } from "inferred-types/types";
import { isInteger, isNumber, isNumberLike, isString } from "inferred-types/runtime";

/**
 * **isRgbDecimal**`(val)`
 *
 * A type guard which checks whether `val` is a valid _number-like_ representation
 * of a decimal value between 0-255.
 *
 * - if passed in value is a _number_ then boolean logic applies but no type narrowing
 * - if passed in value is a `${number}` type then the type will be intersected with `RgbDecimalString`
 *
 */
export function isRgbDecimal<T>(
    val: T
): val is T extends number ? T : T extends string ? T & RgbDecimalString : never {
        return isString(val)
            ? isNumberLike(val) && Number(val) >= 0 && Number(val) <= 255 && isInteger(Number(val))
            : isNumber(val)
                ? val >= 0 && val <= 255 && isInteger(val)
            : false
}
