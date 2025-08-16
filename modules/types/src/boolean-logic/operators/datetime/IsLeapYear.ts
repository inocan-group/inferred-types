// ---------------------------------------------------------

import type { AsFourDigitYear, Unbrand } from "inferred-types/types";
import type { And, Not, Or } from "types/boolean-logic";
import type { DateLike, ParseDate, ParsedDate } from "types/datetime";
import type { Err } from "types/errors";

type EndDiv4
    = | "00" | "04" | "08" | "12" | "16" | "20" | "24" | "28"
    | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60"
    | "64" | "68" | "72" | "76" | "80" | "84" | "88" | "92" | "96";

type DivBy4<Y extends `${number}`> = Y extends `${number}${EndDiv4}`
    ? true
    : false;

type DivBy100<Y extends `${number}`> = Y extends `${number}00` ? true : false;

type DivBy400<Y extends `${number}`> = Y extends `${EndDiv4}00`
    ? true
    : false;

type Detect<Y extends `${number}`> = Or<[
    And<[DivBy400<Y>]>,
    And<[DivBy4<Y>, Not<DivBy100<Y>>]>
]>;

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
        : IsLeapYear<
            AsFourDigitYear<T>
        >

    : Unbrand<T> extends DateLike
        ? string extends Unbrand<T>
            ? boolean
            : Unbrand<T> extends string
                ? ParseDate<Unbrand<T>> extends Error
                    ? ParseDate<Unbrand<T>>
                    : ParseDate<Unbrand<T>> extends ParsedDate
                        ? ParseDate<Unbrand<T>>[0] extends `${number}`
                            ? Detect<ParseDate<Unbrand<T>>[0]>
                            : false
                        : boolean
                : boolean
        : Err<
            `parse-date/invalid-type`,
            `The value passed into IsLeapYear<T> does not extend DateLike!`,
            { val: Unbrand<T> }
        >;
