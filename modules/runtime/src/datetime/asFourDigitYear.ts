import { asNumber, isNegativeNumber, isInteger, isNumber, isNumberLike, err } from "inferred-types/runtime";
import { AsFourDigitYear, FourDigitYear, Narrowable } from "inferred-types/types";




/**
 * **asFourDigitYear**`(year, [branding])`
 *
 * A type conversion utility which tries to convert `year` into a valid `FourDigitYear` type.
 *
 * - by default the conversion is done but the type returned is _not_ a branded type
 * - to switch this behavior then pass in `true` to the generic `B`
 *
 * If there is no way to convert `year` to a `FourDigitYear` then an Error will be returned.
 */
export function asFourDigitYear<const T extends Narrowable, B extends boolean = false>(
    year: T,
    branded: B = false as B
): AsFourDigitYear<T> {
    return (
        isNumber(year)
            ? isInteger(year)
                ? year > 9999
                    ? err(`year-invalid/too-large`)
                : isNegativeNumber(year)
                    ? err(`year-invalid/negative-number`)
                : `${year}`.padStart(4, "0")
            : err(`year-invalid/not-integer`)
        : isNumberLike(year)
            ? asFourDigitYear(asNumber(year) as number) as FourDigitYear
            : err(`year-invalid/wrong-type`)
    ) as AsFourDigitYear<T>
}
