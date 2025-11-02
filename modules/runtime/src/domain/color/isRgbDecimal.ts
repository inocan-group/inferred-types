import { RgbDecimalString } from "inferred-types/types";
import { isInteger, isNumber, isNumberLike, isString } from "runtime/type-guards";

/**
 * **isRgbDecimal**`(val)`
 *
 * A type guard which checks whether `val` is a valid _number-like_ representation
 * of a decimal value between 0-255.
 *
 * - if passed in value is a _number_ then boolean logic applies but no type narrowing
 * - if passed in value is a `${number}` type then the type will be intersected with `RgbDecimalString`
 */
export function isRgbDecimal<T>(val: T): val is T extends number
    ? T
    : T extends string ? T & RgbDecimalString : never {
        return isString(val)
            ?  isNumberLike(val) && Number(val) > 0 && Number(val) < 256 && isInteger(val)
            : isNumber(val)
                ? Number(val) > 0 && Number(val) < 256 && isInteger(val)
            : false
}
