// ---------------------------------------------------------

import type { AsFourDigitYear, Unbrand } from "inferred-types/types";
import type { DateLike, ParseDate, ParsedDate } from "types/datetime";
import type { Err } from "types/errors";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type EndDiv4
    = | "00" | "04" | "08" | "12" | "16" | "20" | "24" | "28"
        | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60"
        | "64" | "68" | "72" | "76" | "80" | "84" | "88" | "92" | "96";

/**
 * **Detect** whether a numeric year string represents a leap year.
 *
 * Directly infers the last two digits (and, for century years, the first two)
 * instead of distributing over large template-literal unions. This avoids the
 * deep type-instantiation chain that caused the previous `Or`/`And`/`Not`
 * formulation to run out of memory on literal inputs.
 */
type Detect<Y extends string> =
    Y extends `${infer First extends Digit}${infer Second extends Digit}${infer Third extends Digit}${infer Fourth extends Digit}${string}`
        ? `${Third}${Fourth}` extends "00"
            ? `${First}${Second}` extends EndDiv4
                ? true
                : false
            : `${Third}${Fourth}` extends EndDiv4
                ? true
                : false
        : false;

/**
 * **IsLeapYear**`<T>`
 *
 * A boolean operator which tests whether the year component of `T` represents a _leap year_
 * or not.
 *
 * - attempts to resolve this to `true`/`false` at design time
 * - however, many of the object-based representations of date/datetime can
 * only be resolved at runtime so it will return `boolean` in these situations.
 */
export type IsLeapYear<
    T
> = T extends number
    ? number extends T
        ? boolean
        : Detect<AsFourDigitYear<T>>

    : [Unbrand<T>] extends [DateLike]
        ? string extends Unbrand<T>
            ? boolean
            : Unbrand<T> extends `${infer A extends Digit}${infer B extends Digit}${infer C extends Digit}${infer D extends Digit}${string}`
                ? Detect<`${A}${B}${C}${D}`>
                : Unbrand<T> extends string
                    ? ParseDate<Unbrand<T>> extends infer P
                        ? P extends Error
                            ? P
                            : P extends ParsedDate
                                ? P[0] extends `${number}`
                                    ? Detect<P[0]>
                                    : false
                                : boolean
                        : boolean
                    : boolean
        : Err<
            `parse-date/invalid-type`,
            `The value passed into IsLeapYear<T> does not extend DateLike!`,
            { val: Unbrand<T> }
        >;
