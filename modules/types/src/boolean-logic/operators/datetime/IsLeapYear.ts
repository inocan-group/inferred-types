// ---------------------------------------------------------

import type {
    And,
    DateLike,
    Err,
    Mod,
    Not,
    Or,
    ParseDate,
    ParsedDate
} from "inferred-types/types";

type EndDiv4 =
    | "00" | "04" | "08" | "12" | "16" | "20" | "24" | "28"
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
> = T extends DateLike
? string extends T
    ? boolean
: T extends string
    ? ParseDate<T> extends Error
        ? ParseDate<T>
    : ParseDate<T> extends ParsedDate
        ? ParseDate<T>[0] extends `${number}`
            ? Detect<ParseDate<T>[0]>
            : false
        : boolean
    : boolean
: Err<
    `parse-date/invalid-type`,
    `The value passed into IsLeapYear<T> does not extend DateLike!`,
    { val: T }
>;
