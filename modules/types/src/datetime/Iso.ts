import type {
    FourDigitYear,
    NumericChar,
    TimezoneOffset,
    TwoDigitDate,
    TwoDigitMonth
} from "inferred-types/types";

/**
 * **IsoYearLike**
 *
 * A year represented by the [**ISO8601**](https://en.wikipedia.org/wiki/ISO_8601) standard.
 * It is represented as either:
 *
 * 1. `YYYY` (the standard way)
 * 2. `+`/`-` followed by `YYYYY` for years beyond the range of 0000 and 9999
 *
 * #### Variants
 * - the default is `normal` which provides decent type structure to help validate
 * but it is not "self-validating" as this would overwhelm the type system
 *    - this will ensure that the year is at least three digits
 * - if you just want a nominal shape that is simple for Typescript to represent then choose `weak`
 * - if you have run this string through a validator of some type you can upgrade it to
 * the `branded` type which is quite weak from a Typescript standpoint but is respected
 * by all utilities in this library to be a validated type
 */
export type IsoYear<
    T extends "normal" | "weak" | "branded" = "normal"
> = T extends "normal"
    ? (
        `${NumericChar}${number}${NumericChar}` | `${"+" | "-"}${number}`
    )
    : T extends "weak"
    ? `${number}` | `${number}${"+" | "-"}${number}`
    : T extends "branded"
    ? `${number}` & { kind: "IsoYear" }
    : never;

/**
 * **IsoMonthDate**`<explicit|implicit|NORMAL|weak|branded>`
 *
 * A type shape representing an ISO Date that represents a month
 * and date but is independent of year:
 *
 * - `--MM-DD` _or_ `--MMDD`
 *
 * #### Variants
 *
 * - by default the `normal` variant is used which provides strong type
 * support for the month but leaves the date as just a numeric literal
 * - choosing `explicit` or `implicit` provides the strongest type validation
 * for _one_ of the two structural variants above.
 * - `weak` ensures the prefix `--` exists and that there are numbers in the right place
 * - `branded` represents a string that _has been_ validated by a utility and though
 * the type is weak (to not overwhelm the type system) it will be seen as "valid"
 */
export type IsoMonthDate<
    T extends "explicit" | "implicit" | "normal" | "weak" | "branded" = "normal"
> = T extends "normal"
    ?
    | `--${TwoDigitMonth}-${number}`
    | `--${TwoDigitMonth}${number}`
    : T extends "weak"
    ?
    | `--${number}-${number}`
    | `--${number}`
    : T extends "branded"
    ? (
        | `--${number}-${number}`
        | `--${number}`
    ) & {
        kind: "IsoMonthDate"
    }
    : T extends "explicit"
    ? `--${TwoDigitMonth}-${TwoDigitDate}`
    : T extends "implicit"
    ? `--${TwoDigitMonth}${TwoDigitDate}`
    : never;

/**
 * **IsoYearMonth**
 *
 * A type shape representing an ISO Date that represents a year
 * and month but not an explicit date:
 *
 * - `-YYYY-MM` _or_ `-YYYYMM`
 *
 * #### Variants
 *
 * - the `normal` variant (used by default) forces the year
 * to be a numeric literal (weak) but provides strong support for the month
 * - where you need a weaker type variant the `weak` variant simply provides
 * structure but forces year and month to be any numeric literal
 * - the `explicit` and `implicit` types provide the strongest type protection
 * for one of the two structural variants above (note: these are complex unions
 * so be care with use)
 */
export type IsoYearMonth<T extends "normal" | "weak" | "explicit" | "implicit" = "normal"> =
    T extends "normal"
    ?
    | `-${number}-${TwoDigitMonth}`
    | `-${number}${TwoDigitMonth}`
    : T extends "weak"
    ?
    | `-${number}-${number}`
    | `-${number}`
    : T extends "explicit"
    ?
    | `-${FourDigitYear<"strong">}-${TwoDigitDate}`
    : T extends "implicit"
    ?
    | `-${FourDigitYear<"strong">}${TwoDigitDate}`
    : never;


/**
 * Full ISO date format (no time info):
 *
 * - `YYYY-MM-DD`, _or_
 * - `YYYYMMDD`
 *
 * **Related:**
 * - `IsoFullDateTime`
 * - `IsoDate`, `IsoMonthDateLike`, `IsoYearMonthLike`
 */
export type IsoFullDate<
    T extends "normal" | "weak" | "branded" = "normal"
> =
    T extends "normal"
    ?
    | `${number}${TwoDigitMonth}${number}`
    | `${number}-${TwoDigitMonth}-${number}`
    : T extends "weak"
    ?
    | `${number}${TwoDigitMonth<"weak">}`
    | `${number}-${TwoDigitMonth<"weak">}-${number}`
    : never;

/**
 * Basic shape for an ISO DateTime string:
 *
 * - `YYYY-MM-DDT${time}`, _or_
 * - `YYYYMMDDT${time}`
 *
 * **Related:**
 * - `IsoFullDate`
 * - `IsoDateTime`, `IsoMonthDateTimeLike`, `IsoYearMonthTimeLike`
 */
export type IsoFullDateTimeLike =
    | `${number}${TwoDigitMonth}${number}T${string}`
    | `${number}-${TwoDigitMonth}-${number}T${string}`;


/**
 * [IsoDate](https://en.wikipedia.org/wiki/ISO_8601)
 *
 * Shows the basic shape for an ISO **Date** string:
 *
 * - `YYYY-MM-DD` _or_ `YYYYMMDD` - _for a full ISO Date_
 * - `-YYYY-MM` _or_ `-YYYYMM` - _for date-independent year-month_
 * - `--MM-DD` _or_ `--MMDD` - _for a year-independent month-date_
 *
 * Please note:
 * - this type is not _self-validating_; it matches all valid variants
 * but there are many false-positives
 * - in order to have the `IsoDate` _branded type_ you should use
 * either:
 *    - `isIsoDate()` type guard
 *    - `IsIsoDate<T>` type utility
 *
 * #### Variants
 *
 * - by default this type uses the `normal` variant which is good
 * for matching but not "validation"
 * - you can choose "full" if you only want to match for the full
 * year-month-date sort of date and there is more structure to the
 * type provided
 * - if you've validated with an external utility you can use
 * the `branded` variant which is a fairly broad "type" but will
 * be treated by other utilities as having been validated.
 */
export type IsoDate<
    T extends "normal" | "branded" = "normal"
> = T extends "branded"
? (
    IsoFullDate<"weak"> | IsoYearMonth<"weak"> | IsoMonthDate<"weak"> | IsoYear<"weak">
) & { kind: "IsoDate" }
: T extends "normal"
    ? IsoFullDate<"weak"> | IsoYearMonth<"weak"> | IsoMonthDate<"weak"> | IsoYear<"weak">
: T extends "full"
    ? IsoFullDate<"normal">
: never;


/**
 * [IsoDateTime](https://en.wikipedia.org/wiki/ISO_8601)`<NORMAL | branded>`
 *
 * Shows the basic shape for an ISO **DateTime** string.
 *
 * #### Variants
 *
 * - by default the `normal` variant is used which just captures
 * the basic shape
 * - however, if you've validated using some other utility then
 * you can use the `branded` type which has the same type but
 * will be treated as "validated" by other utilities
 */
export type IsoDateTime<
    T extends "normal" | "branded" = "normal"
> = T extends "normal"
? `${number}-${number}-${number}T${number}:${number}${string}`
: `${number}-${number}-${number}T${number}:${number}${string}` & {
    kind: "IsoDateTime"
};


/**
 * **[Iso8601TimeLike](https://en.wikipedia.org/wiki/ISO_8601)**
 *
 * Represents the general shape that **all** ISO Time strings
 * will fit into.
 *
 * This allows for the following structures:
 *
 * - `[hh]:[mm]`
 * - `[hh]:[mm]:[ss]`
 * - `[hh]:[mm]:[ss].[mmm]`
 *
 * All of these structures can also optionally have timezone information:
 *
 * - `Z` - _indicating UTC time_
 * - `["+" | "-"][hh]`
 * - `["+" | "-"][hh][mm]`
 * - `["+" | "-"][hh]:[mm]`
 *
 * Please note:
 *
 * - this shape will allow _false positives_ and Typescript's type
 * system can not by itself fully represent a type that acts as not
 * only a _type_ but a _validator_.
 * - you can do runtime validation with `isIsoTime()`and if it passes
 * the validation the type will be "upgraded" to `IsoTime` which
 * convey's the same type constraint but is a _branded_ type indicating
 * that it has been validated.
 *
 * **Related:**
 * - `IsoTime`, `IsoDateTime`, `IsoDate`
 * - `IsoDateLike`, `IsoDateTimeLike`
 */
export type IsoTimeLike<
    THour extends number = number,
    TMin extends number = number,
    TZ extends TimezoneOffset | "" = TimezoneOffset | ""
> =
    | `${THour}:${TMin}${TZ}`
    | `${THour}:${TMin}:${number}${TZ}`
    | `${THour}:${TMin}:${number}.${number}${TZ}`;

/**
 * **IsoTime**`<[TExplicit], [TZ]>`
 *
 * The [**ISO8601**](https://en.wikipedia.org/wiki/ISO_8601)
 * standard's representation of **time**.
 *
 * This allows for the following structures:
 *
 * - `[hh]:[mm]`
 * - `[hh]:[mm]:[ss]`
 * - `[hh]:[mm]:[ss].[mmm]`
 *
 * This type was validated from either:
 *   - `isIsoTime()` - type guard
 *   - `IsIsoTime<T>` - type utility
 *
 * And is a branded type of `IsoTimeLike`
 */
export type IsoTime<
    THour extends number = number,
    TMin extends number = number,
    TZ extends TimezoneOffset | "" = TimezoneOffset
> = IsoTimeLike<THour, TMin, TZ> & {
    kind: "ISO Time";
};
