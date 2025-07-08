import type {
    As,
    Err,
    FourDigitYear,
    IsFourDigitYear,
    IsTwoDigitMonth,
    ParsedTime,
    ParseTime,
    Split,
    TakeDate,
    TakeMonth,
    TakeYear,
    TwoDigitDate,
    TwoDigitMonth
} from "inferred-types/types";
import { IsTwoDigitDate } from "types/boolean-logic/operators/datetime";


export type ParsedDate = [
    year: FourDigitYear<"branded"> | null,
    month: TwoDigitMonth<"branded"> | null,
    date: TwoDigitDate<"branded"> | null,
    /**
     * When parsing for a Date we will also check if time
     * info is available. Possible outcomes
     * - no time info will result in no property
     * - valid time info will set this to `ParsedTime`
     * - invalid time info will result in an error
     */
    time: ParsedTime | null
];

type ParseMonthDate<
    T extends string
> = string extends T
? never
: TakeMonth<T> extends {
    take: infer Month extends `${number}`
    rest: infer Rest extends string
}
    ? TakeDate<Rest,"-"> extends {
        take: infer IsoDate extends `${number}`
        rest: infer Rest extends string
    }
        ? Rest extends ""
            ? IsTwoDigitMonth<Month> extends true
                ? IsTwoDigitDate<IsoDate, Month> extends true
                    ? [
                        null,
                        Month & TwoDigitMonth<"branded">,
                        IsoDate & TwoDigitDate<"branded">,
                        null
                    ]
                    : Err<
                        `parse-date/validation`,
                        `The month and date were parsed but on detailed evaluation the date was not valid [${IsoDate}].`,
                        { parse: T, month: Month, date: IsoDate, rest: Rest }
                    >
                : Err<
                        `parse-date/validation`,
                        `The month and date were parsed but on detailed evaluation the month was not valid [${Month}].`,
                        { parse: T, month: Month, date: IsoDate, rest: Rest }
                    >
        : Err<
            `parse-date/leftover`,
            `A string which appeared to be a IsoMonthDate string had trailing content which was unparsable [${Rest}]!`,
            { parse: T, month: Month, date: IsoDate, rest: Rest }
        >
    : Err<
        `parse-date/month`,
        `A string which appeared to be a IsoMonthDate string had an invalid month [${Month}]!`,
        { parse: T, month: Month, rest: Rest }
    >
: Err<
    `parse-date/month-date`,
    `Unable to parse the month of what appeared to be an IsoMonthDate string`,
    { parse: T }
>;


type ParseYearMonth<T extends string> = TakeYear<T> extends {
    take: infer Year extends `${number}`
    rest: infer Rest extends string
}
    ? TakeMonth<Rest, "-"> extends {
        take: infer Month extends `${number}`
        rest: infer Rest extends string
    }
        ? IsFourDigitYear<Year> extends true
            ? IsTwoDigitMonth<Month> extends true
                ? Rest extends ""
                    ? [
                        Year & FourDigitYear<"branded">,
                        Month & TwoDigitMonth<"branded">,
                        null,
                        null
                    ]
                : Err<
                    `parse-date/month`,
                    `The string looks like an IsoYearMonth string and both year and month were parsed out but upon validation the month [${Month}] appears to be invalid!`,
                    { parse: T, year: Year, month: Month }
                >
            : Err<
                `parse-date/month`,
                `The string looks like an IsoYearMonth string and both year and month were parsed out but upon validation the year [${Year}] appears to be invalid!`,
                { parse: T, year: Year, month: Month }
            >
        : Err<
            `parse-date/year-month`,
            `The month in what appeared to be a IsoYearMonth string was unable to be parsed`,
            { parse: T, year: Year, rest: Rest }
        >
    : Err<
        `parse-date/year-month`,
        `The month in what appeared to be a IsoYearMonth string was unable to be parsed`,
        { parse: T, year: Year, rest: Rest }
    >
: Err<
    `parse-date/year-month`,
    `The year in what started out as a IsoYearMonth string was unable to be parsed`,
    { parse: T }
>;


type ParseFullDate<T extends string> = TakeYear<T> extends {
    take: infer Year extends `${number}`
    rest: infer Rest extends string
}
    ? TakeMonth<Rest, "-"> extends {
        take: infer Month extends `${number}`
        rest: infer Rest extends string
    }
        ? TakeDate<Rest,"-"> extends {
            take: infer Date extends `${number}`
            rest: infer Rest extends string
        }
            ? IsFourDigitYear<Year> extends true
                ? IsTwoDigitMonth<Month> extends true
                    ? IsTwoDigitDate<Date,Month,Year> extends true
                        ? As<
                            [
                                Year & FourDigitYear<"branded">,
                                Month & TwoDigitMonth<"branded">,
                                Date & TwoDigitDate<"branded">,
                                null
                            ],
                            ParsedDate
                        >
                    : Err<
                        `parse-date/date`,
                        `Invalid date: ${Date}`,
                        { year: Year, month: Month, date: Date }
                    >
                : Err<
                    `parse-date/month`,
                    `Invalid month: ${Month}`,
                    { year: Year, month: Month, date: Date }
                >
            : Err<
                `parse-date/year`,
                `Invalid year: ${Year}`,
                { year: Year, month: Month, date: Date }
            >

        : Err<
            "parse-date/date", "Was unable to parse the date component",
            { year: Year; month: Month; rest: Rest }
        >
    : Err<
        "parse-date/month",
        `Unable to parse the month!`,
        { year: Year; rest: Rest }
    >
: Err<
    "parse-date/year",
    `Unable to parse the year!`,
    { parse: T }
>;

type ParseDateTime<T extends `${string}T${string}`> = Split<T, "T"> extends [
    infer DatePart extends string,
    infer TimePart extends string
]
    ? ParseFullDate<DatePart> extends Error
        ? Err<
            `parse-date/datetime`,
            `The date component of a DateTime string was invalid: ${ParseFullDate<DatePart>["message"]}`,
            { parse: T, date: DatePart, time: TimePart }
        >
        : ParseTime<TimePart> extends Error
            ? Err<
                `parse-date/datetime`,
                `The time component of a DateTime string was invalid: ${ParseTime<TimePart>["message"]}`,
                { parse: T,  date: DatePart, time: TimePart }
            >
            : As<
                [
                    As<ParseDate<DatePart>, ParsedDate>[0],
                    As<ParseDate<DatePart>, ParsedDate>[1],
                    As<ParseDate<DatePart>, ParsedDate>[2],
                    As<ParseTime<TimePart>, ParsedTime>
                ],
                ParsedDate
            >

    : Err<`parse-date/datetime`, `Invalid structure`, { parse: T }>;


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
    ? ParsedDate | Error // wide string
    : T extends `--${infer Rest extends string}`
    ? ParseMonthDate<Rest>
    // ----
    : T extends `-${infer Rest extends string}`
    ? ParseYearMonth<Rest>
    // ----
    : T extends `${string}T${string}`
        ? ParseDateTime<T>
        : ParseFullDate<T>
    : Err<
        `parse-date/wrong-type`,
        `A non-string type was passed into ParseDate<T>!`
    >;
