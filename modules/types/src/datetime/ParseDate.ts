import type {
    DoesNotExtend,
    Err,
    FourDigitYear,
    IsLeapYear,
    IsLessThanOrEqual,
    IsoYear,
    IsUndefined,
    NumericChar,
    ParsedTime,
    ParseTime,
    RetainAfter,
    RetainWhile,
    StripAfter,
    StripLeading,
    TakeDate,
    TakeMonth,
    TakeYear,
    TwoDigitDate,
    TwoDigitMonth
} from "inferred-types/types";

type FebDatesLeap =
    "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" |
    "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" |
    "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29";

type FebDatesNonLeap =
    "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" |
    "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" |
    "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28";

export type ParsedDate = [
    year: FourDigitYear<"strong"> | null,
    month: TwoDigitMonth | null,
    date: TwoDigitDate | null,
    /**
     * When parsing for a Date we will also check if time
     * info is available. Possible outcomes
     * - no time info will result in no property
     * - valid time info will set this to `ParsedTime`
     * - invalid time info will result in an error
     */
    time: ParsedTime | null
];

type ParseMonthDate<T extends string> = TakeMonth<T> extends [
    infer Month extends TwoDigitMonth,
    infer Rest extends string
]
    ? Month extends undefined
    ? Err<
        `parse-date/month`,
        `The string passed in looked like a year independent date but after the initial '--' the month was unable to be parsed!`,
        { parse: T, year: null, rest: Rest }
    >
    : TakeDate<StripLeading<Rest, "-">> extends [
        infer Date extends TwoDigitDate,
        infer Rest extends string
    ]
    ? Date extends undefined
    ? Err<
        `parse-date/date`,
        `The string passed in looked like a year independent date but after the parsing the month, the rest was unable to be parsed: '${Rest}'`,
        { parse: T, month: Month, rest: Rest }
    >
    : Rest extends ""
    ? [null, Month, Date, null]
    : Rest extends `T${infer Time extends string}`
    ? ParseTime<Time> extends Error
    ? Err<
        `parse-date/time`,
        `The date component -- a year independent, month and day -- was parsed from the string but the time included is not parsable: ${Time}. The underlying error message was: ${ParseTime<Time>["message"]}`,
        { parse: T, month: Month, date: Date, time: Time }
    >
    : [null, Month, Date, ParseTime<Time>]
    : Err<
        `parse-date/time`,
        `The date component -- a year independent, month and day -- was parsed from the string but the time included is not parsable: ${Rest}. The underlying error message was: ${ParseTime<Rest>["message"]}`,
        { parse: T, month: Month, date: Date, time: Rest }
    >
    : Err<
        `parse-date/date`,
        `The string passed in looked like a year independent date but after the parsing the month, '${StripLeading<Rest, "-">}' was unable to be parsed as a date!`,
        { parse: T, year: null, month: Month, rest: Rest }
    >
    : Err<
        `parse-date/month`,
        `The string passed in looked like a year independent month and date but after the initial '--', the string '${StripAfter<T, "-">}' couldn't be parsed as a month!`,
        { parse: T, year: null }
    >;

type ParseYearMonth<T extends string> = TakeYear<T> extends [
    infer Year extends FourDigitYear<"strong">,
    infer Rest extends string
]
    ? TakeMonth<StripLeading<Rest, "-">> extends [
        infer Month extends TwoDigitMonth,
        infer Rest extends string
    ]
    ? Rest extends ""
    ? [Year, Month, null, null]
    : Rest extends `T${infer Time extends string}`
    ? ParseTime<Time> extends Error
    ? Err<
        "parse-date/time",
        `The string passed in appears to be a ISO DateTime string where the date component is a year/month date (and was successfully parsed) but the time component is invalid: ${Time}. The underlying error message was: ${ParseTime<Time>["message"]}`,
        { parse: T, year: Year, month: Month, time: Time }
    >
    : [Year, Month, null, ParseTime<Time>]
    : Err<
        `parse-date/time`,
        `The ISO string appears to be a year/month date with some time information but while the year and month were parsed, there were issues parsing the time.`,
        {
            year: Year;
            month: Month;
            date: null;
            rest: Rest;
            parse: T;
        }
    >
    : Err<
        `parse-date/month`,
        `Problems parsing a year/month date resolution.`,
        {
            year: Year;
            date: null;
            rest: Rest;
            parse: T;
        }
    >
    : Err<
        `parse-date`,
        `Unable to parse the year/month string passed in: ${T}`,
        {
            parse: T;
        }
    >;


type MonthsWith30Days = "04" | "06" | "09" | "11";
type Dates30 =
    "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" |
    "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" |
    "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30";
type Dates31 = Dates30 | "31";

type ValidateMonthDate<
    Year extends FourDigitYear,
    Month extends TwoDigitMonth,
    Date extends TwoDigitDate
> = Month extends "02"
    ? [IsLeapYear<Year>] extends [true]
    ? [Date] extends [FebDatesLeap]
    ? true
    : Err<
        `parse-date/invalid-date`,
        `The year "${Year}" is a leap year but the date provided is still too large for February (${Date})`,
        { year: Year, month: Month, date: Date }
    >
    : Date extends FebDatesNonLeap
    ? true
    : Err<
        `parse-date/invalid-date`,
        `The year "${Year}" is not a leap year so the date is too large for February (${Date})`,
        { year: Year, month: Month, date: Date }
    >
    : Month extends MonthsWith30Days
    ? Date extends Dates30
    ? true
    : Err<
        `parse-date/invalid-date`,
        `The month "${Month}" only has 30 days, so the date "${Date}" is invalid!`,
        { year: Year, month: Month, date: Date }
    >
    : Date extends Dates31
    ? true
    : Err<
        `parse-date/invalid-date`,
        `The month "${Month}" only allows dates up to 31, so the date "${Date}" is invalid!`,
        { year: Year, month: Month, date: Date }
    >;

type ParseFullDate<T extends string> = TakeYear<T> extends [
    infer Year extends FourDigitYear<"strong">,
    infer Rest extends string
]
    ? IsUndefined<Year> extends true
    ? Err<
        "parse-date/year",
        `The string passed in is invalid, the year can not be parsed!`,
        { parse: T }
    >
    : TakeMonth<StripLeading<Rest, "-">> extends [
        infer Month extends TwoDigitMonth,
        infer Rest extends string
    ]
    ? T extends IsoYear
    ? [Year, null, null, null]
    : IsUndefined<Month> extends true
    ? Err<
        `parse-date/month`,
        `The month [${StripAfter<RetainAfter<T, "-">, "-">}] is not valid!`,
        { parse: T, year: Year, month: Month, rest: Rest }
    >
    : TakeDate<StripLeading<Rest, "-">> extends [
        infer Date extends TwoDigitDate,
        infer Rest extends string
    ]
    ? IsUndefined<Date> extends true
    ? Err<
        `parse-date/date`,
        `The date is not valid!`,
        { parse: T, year: Year, month: Month, rest: Rest }
    >
    : ValidateMonthDate<Year, Month, Date> extends Error
    ? ValidateMonthDate<Year, Month, Date>
    : Rest extends ""
    ? [Year, Month, Date, null]
    : Rest extends `T${infer Time extends string}`
    ? ParseTime<Time> extends Error
    ? Err<
        `parse-date/time`,
        `A full date (year,month,date) was parsed from the provided string but the time component is invalid: ${Rest}. The underlying error message was: ${ParseTime<Time>["message"]}`,
        { parse: T, year: Year, month: Month, date: Date, time: Rest }
    >
    : [Year, Month, Date, ParseTime<Time>]
    : Err<
        "parse-date",
        `Problems parsing a date; it appears to be an issue with Timezone component: ${Rest}`,
        {
            year: Year;
            month: Month;
            date: Date;
            rest: Rest;
            parse: T;
        }
    >
    : Err<
        `parse-date`,
        `Problems parsing a date; year and month were parsed but remaining content was invalid: ${Rest}`,
        {
            year: Year;
            month: Month;
            rest: Rest;
            parse: T;
        }
    >
    : Rest extends ""
    ? [Year, null, null, null]
    : Err<
        `parse-date`,
        `Unable to parse the string passed in: ${T}`,
        {
            year: Year;
            rest: Rest;
            parse: T;
        }
    >
    : Err<
        `parse-date`,
        `Unable to parse the string passed in: ${T}`,
        {
            parse: T;
        }
    >;

/**
 * **ParseDate**`<T, [TSep]>`
 *
 * Parses an ISO Date string to extract the core data.
 *
 * ISO Dates come in the following flavors:
 *
 * - `YYYY-MM-DD` _or_ `YYYYMMDD`
 * - `-YYYY-MM` _or_ `-YYYYMM` (_for year/month resolution and no date_)
 * - `--MM-DD` _or_ `--MMDD` (_for year independent dates_)
 */
export type ParseDate<
    T,
> = T extends string
    ? string extends T
    ? ParsedDate | Error
    : T extends `--${infer Rest extends string}`
    ? ParseMonthDate<Rest>
    // ----
    : T extends `-${infer Rest extends string}`
    ? ParseYearMonth<Rest>
    // ----
    : ParseFullDate<T>
    : Err<
        `parse-date/wrong-type`,
        `A non-string type was passed into ParseDate<T>!`
    >;
