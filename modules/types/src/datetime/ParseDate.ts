import type {
    Err,
    FourDigitYear,
    ParsedTime,
    ParseTime,
    StartsWith,
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
    ? StartsWith<T, "--"> extends true
        ? TakeMonth<StripLeading<T, "--">> extends [
            infer Month extends TwoDigitMonth,
            infer Rest extends string
        ]
            ? TakeDate<StripLeading<Rest, "-">> extends [
                infer Date extends TwoDigitDate,
                infer Rest extends string
            ]
                ? Rest extends ""
                    ? [ null, Month, Date ]
                    : Rest extends `T${infer Time extends string}`
                        ? [ null, Month, Date, ParseTime<Time> ]
                        : Err<
                            `parse/date`,
                `Parsed out a year independent date but there was remaining content which could not be parsed: ${Rest}`,
                {
                    year: null;
                    month: Month;
                    date: Date;
                    rest: Rest;
                    string: T;
                }
                        >
                : Err<
                    `parse/date`,
                    `Unable to parse out the date from a year independent date!`,
                    {
                        year: null;
                        month: Month;
                        rest: Rest;
                        string: T;
                    }
                >
            : Err<
                `parse/date`,
                `Bad structure for what was indicated to be a year independent date`,
                {
                    string: T;
                }
            >
    // ----
        : StartsWith<T, "-"> extends true
            ? TakeYear<StripLeading<T, "-">> extends [
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
                            ? [ Year, Month, null, ParseTime<Time> ]
                            : Err<
                                `parse/date`,
                                `Problems parsing a year/month date resolution.`,
                                {
                                    year: Year;
                                    month: Month;
                                    date: null;
                                    rest: Rest;
                                    string: T;
                                }
                            >
                    : Err<
                        `parse/date`,
                        `Problems parsing a year/month date resolution.`,
                        {
                            year: Year;
                            date: null;
                            rest: Rest;
                            string: T;
                        }
                    >
                : Err<
                    `parse/date`,
        `Unable to parse the year/month string passed in: ${T}`,
        {
            string: T;
        }
                >
        // ----
            : TakeYear<T> extends [
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
                                ? [ Year, Month, Date, ParseTime<Time> ]
                                : Err<
                                    "parse/date",
                    `Problems parsing a date; year, month, and date were all parsed but the remaining content is invalid: ${Rest}`,
                    {
                        year: Year;
                        month: Month;
                        date: Date;
                        rest: Rest;
                        string: T;
                    }
                                >
                        : Err<
                            `parse/date`,
                `Problems parsing a date; year and month were parsed but remaining content was invalid: ${Rest}`,
                {
                    year: Year;
                    month: Month;
                    rest: Rest;
                    string: T;
                }
                        >
                    : Rest extends ""
                        ? [ Year, null, null, null ]
                        : Err<
                            `parse/date`,
                    `Unable to parse the string passed in: ${T}`,
                    {
                        year: Year;
                        rest: Rest;
                        string: T;
                    }
                        >
                : Err<
                    `parse/date`,
        `Unable to parse the string passed in: ${T}`,
        {
            string: T;
        }
                >
    : Err<
        `parse/date`,
        `A non-string type was passed into ParseDate<T>`
    >;
