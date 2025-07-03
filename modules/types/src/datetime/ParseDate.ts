import type {
    Err,
    FourDigitYear,
    ParsedTime,
    ParseTime,
    StartsWith,
    StripAfter,
    StripLeading,
    TakeDate,
    TakeMonth,
    TakeYear,
    TwoDigitDate,
    TwoDigitMonth
} from "inferred-types/types";

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
    time: ParsedTime | Error | null
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
        ? [ null, Month, Date ]
    : Rest extends `T${infer Time extends string}`
        ? ParseTime<Time> extends Error
            ? Err<
                `parse-date/time`,
                `The date component -- a year independent, month and day -- was parsed from the string but the time included is not parsable: ${Time}. The underlying error message was: ${ParseTime<Time>["message"]}`,
                { parse: T, month: Month, date: Date, time: Time }
            >
            : [ null, Month, Date, ParseTime<Time> ]
        : Err<
            `parse-date/time`,
            `The date component -- a year independent, month and day -- was parsed from the string but the time included is not parsable: ${Rest}. The underlying error message was: ${ParseTime<Rest>["message"]}`,
            { parse: T, month: Month, date: Date, time: Rest }
        >
    : Err<
        `parse-date/date`,
        `The string passed in looked like a year independent date but after the parsing the month, '${StripLeading<Rest,"-">}' was unable to be parsed as a date!`,
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
        ? [ Year, Month, null, null ]
    : Rest extends `T${infer Time extends string}`
        ? ParseTime<Time> extends Error
            ? Err<
                "parse-date/time",
                `The string passed in appears to be a ISO DateTime string where the date component is a year/month date (and was successfully parsed) but the time component is invalid: ${Time}. The underlying error message was: ${ParseTime<Time>["message"]}`,
                { parse: T, year: Year, month: Month, time: Time }
            >
            : [ Year, Month, null, ParseTime<Time> ]
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

type ParseFullDate<T extends string> = TakeYear<T> extends [
    infer Year extends FourDigitYear<"strong">,
    infer Rest extends string
]
    ? TakeMonth<StripLeading<Rest, "-">> extends [
        infer Month extends TwoDigitMonth,
        infer Rest extends string
    ]
        ? TakeDate<StripLeading<Rest, "-">> extends [
            infer Date extends TwoDigitDate,
            infer Rest extends string
        ]
            ? Rest extends ""
                ? [ Year, Month, Date, null ]
                : Rest extends `T${infer Time extends string}`
                    ? ParseTime<Time> extends Error
                        ? Err<
                            `parse-date/time`,
                            `A full date (year,month,date) was parsed from the provided string but the time component is invalid: ${Rest}. The underlying error message was: ${ParseTime<Time>["message"]}`,
                            { parse: T, year: Year, month: Month, date: Date, time: Rest }
                        >
                    : [ Year, Month, Date, ParseTime<Time> ]
                    : Err<
                        "parse-date",
                        `Problems parsing a date; year, month, and date were all parsed but the remaining content is invalid: ${Rest}`,
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
                    ? [ Year, null, null, null ]
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
    ? T extends `--${infer Rest extends string}`
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
