import { As, Extends, IsNull,  Or } from "types/boolean-logic";
import {
    DateMeta,
    ParseDate,
    ParsedDate,
    ParsedTime,

} from "types/datetime";

type ParsedDateType<T extends ParsedDate> = T extends [
    infer Year,
    infer Month,
    infer Date,
    infer Time
]
    ? Date extends null
    ? Month extends null
    ? "year"
    : "year-month"
    : Year extends null
    ? "year-independent"
    : Time extends null
    ? "date"
    : "datetime"
    : never;

type HasTime<T extends ParsedDate> = ParsedDateType<T> extends "datetime"
    ? T[3] extends [infer Hour, infer Minute, infer Second, infer MS, infer TZ]
    ? Hour extends "00"
    ? Minute extends "00"
    ? Or<[Extends<Second, "00">, IsNull<Second>]> extends true
    ? Or<[
        Extends<MS, "000">, IsNull<MS>
    ]> extends true
    ? Or<[
        Extends<TZ, "Z">,
        IsNull<TZ>
    ]> extends true
    ? false
    : true
    : true
    : true
    : true
    : true
    : never
    : false;

type Hour<T extends ParsedTime | null> = T extends null
    ? null
    : T extends ParsedTime
    ? T[0]
    : never;

type Minute<T extends ParsedTime | null> = T extends null
    ? null
    : T extends ParsedTime
    ? T[1]
    : never;

type Second<T extends ParsedTime | null> = T extends null
    ? null
    : T extends ParsedTime
    ? T[2]
    : never;

type Millisecond<T extends ParsedTime | null> = T extends null | undefined
    ? null
    : T extends ParsedTime
    ? T[3]
    : never;

type Offset<T extends ParsedTime | null> = T extends null
    ? null
    : T extends ParsedTime
    ? T[4]
    : never;


type SetParsed<T extends ParsedDate> = As<{
    dateType: ParsedDateType<T>,
    hasTime: HasTime<T>,
    year: T[0],
    month: T[1],
    date: T[2],
    hour: Hour<T[3]>,
    minute: Minute<T[3]>,
    second: Second<T[3]>,
    ms: Millisecond<T[3]>,
    offset: Offset<T[3]>
},
    DateMeta
>;

/**
 * **AsDateMeta**`<T>`
 *
 * Tests to see if `T` can be parsed into a `DateMeta` type.
 *
 * - if it can then `DateMeta` is returned
 * - if not then an `Error` will be returned
 *
 * Note: if the value passed in as `T` is a `ParsedDate` type
 * then this utility will never return an error as the validation
 * has already been done.
 */
export type AsDateMeta<
    T
> = T extends ParsedDate
    ? SetParsed<T>
    : ParseDate<T> extends Error
    ? As<ParseDate<T>, Error>
    : SetParsed<As<ParseDate<T>, ParsedDate>>;


// {
//     dateType: ParsedDateType<T>,
//     hasTime: HasTime<T>,
//     year: T[0],
//     month: T[1],
//     date: T[2],
//     hour: Hour<T[3]>,
//     minute: Minute<T[3]>,
//     second: Second<T[3]>,
//     ms: Millisecond<T[3]>,
//     timezone: Offset<T[3]>,
//     toString(): ToIsoString<
//         "auto",
//         ParsedDateType<T>, HasTime<T>,
//         T[0], T[1], T[2],
//         Hour<T[3]>, Minute<T[3]>, Second<T[3]>, Millisecond<T[3]>,
//         Offset<T[3]>
//     >;
//     asYear(): ToIsoString<
//         "year",
//         ParsedDateType<T>, HasTime<T>,
//         T[0], T[1], T[2],
//         Hour<T[3]>, Minute<T[3]>, Second<T[3]>, Millisecond<T[3]>,
//         Offset<T[3]>
//     >;
//     asYearIndependent(): ToIsoString<
//         "year-independent",
//         ParsedDateType<T>, HasTime<T>,
//         T[0], T[1], T[2],
//         Hour<T[3]>, Minute<T[3]>, Second<T[3]>, Millisecond<T[3]>,
//         Offset<T[3]>
//     >;
//     asYearMonth(): ToIsoString<
//         "year-month",
//         ParsedDateType<T>, HasTime<T>,
//         T[0], T[1], T[2],
//         Hour<T[3]>, Minute<T[3]>, Second<T[3]>, Millisecond<T[3]>,
//         Offset<T[3]>
//     >;
//     asDate(): ToIsoString<
//         "date",
//         ParsedDateType<T>, HasTime<T>,
//         T[0], T[1], T[2],
//         Hour<T[3]>, Minute<T[3]>, Second<T[3]>, Millisecond<T[3]>,
//         Offset<T[3]>
//     >;
//     asDateTime(): ToIsoString<
//         "datetime",
//         ParsedDateType<T>, HasTime<T>,
//         T[0], T[1], T[2],
//         Hour<T[3]>, Minute<T[3]>, Second<T[3]>, Millisecond<T[3]>,
//         Offset<T[3]>
//     >;
// };
