import type {
    FourDigitYear,
    NumericChar,
    Opt,
    TimezoneOffset,
    TwoDigitDate,
    TwoDigitHour,
    TwoDigitMonth
} from "inferred-types/types";

/**
 * **Iso8601Year**
 *
 * A year represented by the [**ISO8601**](https://en.wikipedia.org/wiki/ISO_8601) standard.
 * It is represented as either:
 *
 * 1. `YYYY` (the standard way)
 * 2. `+`/`-` followed by `YYYYY` for years beyond the range of 0000 and 9999
 */
export type IsoYear = `${NumericChar}${NumericChar}${NumericChar}${NumericChar}` | `${"+" | "-"}${number}`;

// — date part: “YYYY-MM-DD” (or any numeric segments)
type DatePart = `${number}-${number}-${TwoDigitDate}`;

// — time part: “hh:mm”   | “hh:mm:ss”   | “hh:mm:ss.sss…”
type TimePart =
    | `${number}:${number}`
    | `${number}:${number}:${number}`
    | `${number}:${number}:${number}.${number}`;



export type IsoMonthDateLike__Explicit = `--${TwoDigitMonth}-${TwoDigitDate}`;
export type IsoMonthDateLike__Implicit = `--${TwoDigitMonth}${TwoDigitDate}`;

/**
 * **IsoMonthDateLike**
 *
 * A type shape representing an ISO Date that represents a month
 * and date but is independent of year:
 *
 * - `--MM-DD` _or_ `--MMDD`
 */
export type IsoMonthDateLike =
    | `--${TwoDigitMonth}-${number}`
    | `--${TwoDigitMonth}${number}`;


/**
 * **IsoMonthDate**
 *
 * A branded type that comes from validating using a type guard
 * like `isIsoMonthDate()`.
 *
 * **Related:**
 * - `IsoMonthDateLike`
 */
export type IsoMonthDate =
    IsoMonthDateLike
    & {
        kind: "IsoMonthDate"
    };


/**
 * **IsoYearMonthLike**
 *
 * A type shape representing an ISO Date that represents a year
 * and month but not explicit date:
 *
 * - `-YYYY-MM` _or_ `-YYYYMM`
 */
export type IsoYearMonthLike =
    | `-${FourDigitYear}-${number}`
    | `-${FourDigitYear}${number}`;

export type IsoYearMonthLike__Explicit = `-${FourDigitYear}-${TwoDigitMonth}`;
export type IsoYearMonthLike__Implicit = `-${FourDigitYear}${TwoDigitMonth}`;


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
export type IsoFullDateLike =
    | `${number}${TwoDigitMonth}${number}`
    | `${number}-${TwoDigitMonth}-${number}`;

/**
 * Full ISO date format plus time info:
 *
 * - `YYYY-MM-DDT${time}`, _or_
 * - `YYYYMMDDT${time}`
 *
 * **Related:**
 * - `IsoFullDate`
 * - `IsoDateTime`, `IsoMonthDateTimeLike`, `IsoYearMonthTimeLike`
 */
export type IsoFullDateTime =
    | `${FourDigitYear}${TwoDigitMonth}${number}T${string}`
    | `${FourDigitYear}-${TwoDigitMonth}-${number}T${string}`;


/**
 * [IsoDateLike](https://en.wikipedia.org/wiki/ISO_8601)
 *
 * Shows the basic shape for an ISO **Date** string:
 *
 * - `YYYY-MM-DD` _or_ `YYYYMMDD` - _for a full ISO Date_
 * - `-YYYY-MM` _or_ `-YYYYMM` - _for date-independent year-month_
 * - `--MM-DD` _or_ `--MMDD` - _for a year-independent month-date_
 *
 * Please note:
 * - this type is not _self-validating_; it matches all valid variants
 * but there are some false-positives which also match
 * - in order to have the `IsoDate` _branded type_ you should use
 * either:
 *    - `isIsoDate()` type guard
 *    - `IsIsoDate<T>` type utility
 */
export type IsoDateLike =
    | IsoFullDateLike // full date
    | `-${number}${Opt<'-'>}${number}` // IsoYearMOnth
    | `--${number}${Opt<'-'>}${number}` // IsoMonthDate
    | `${number}` // IsoDate

/**
 * **[IsoDate](https://en.wikipedia.org/wiki/ISO_8601)**
 *
 * A branded type which shares a type with `IsoDateLike` but
 * has been validated by `isIsoDate()` or `IsIsoDate<T>`.
 *
 * The format of this type will look like:
 *
 * - `YYYY-MM-DD`
 * - `--MM-DD`  - _for a year-independent date_
 */
export type IsoDate = IsoDateLike & {
    kind: "IsoDate";
};

/**
 * [IsoDateTimeLike](https://en.wikipedia.org/wiki/ISO_8601)
 *
 * Shows the basic shape for an ISO **DateTime** string.
 *
 * - a _type_ which entirely ensured this was a valid ISO
 * DateTime string is not practical in the Typescript type
 * system so there are strings in this shape which are not valid
 * - however, all valid ISO DateTime's will fit this shape.
 * - to fully validate, run `isIsoDateTime()` and it will upgrade
 * this type to a `IsoDateTime` branded type.
 */
export type IsoDateTimeLike =
    | `${FourDigitYear}-${number}-${number}T${number}-${number}${string}`;

/**
 * **IsoDateTime**
 *
 * A branded type indicating that this value not only fits the
 * shape of `IsoDateTimeLike` but has been validated at runtime
 * to be a valid `IsoDateTime`.
 */
export type IsoDateTime = IsoDateTimeLike & {
    kind: "ISO DateTime";
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
    THour extends TwoDigitHour = TwoDigitHour,
    TZ extends TimezoneOffset | "" = TimezoneOffset | ""
> =
    | `${THour}:${number}${TZ}`
    | `${THour}:${number}:${number}${TZ}`
    | `${THour}:${number}:${number}.${number}${TZ}`;

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
    THour extends TwoDigitHour = TwoDigitHour,
    TZ extends TimezoneOffset | "" = TimezoneOffset
> = IsoTimeLike<THour, TZ> & {
    kind: "ISO Time";
};
