import { Unbrand } from "inferred-types/types";
import type { As, IsFourDigitYear, IsLeapYear, IsTwoDigitDate } from "types/boolean-logic";
import type { FourDigitYear, ParsedTime, ParseTime, TwoDigitDate, TwoDigitMonth } from "types/datetime";
import type { Err, ErrContext } from "types/errors";
import type { Split, StrLen, TakeDate, TakeMonth, TakeYear } from "types/string-literals";

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
    ? ParsedDate | Error
    : TakeMonth<T> extends {
        take: infer Month extends TwoDigitMonth<"branded">;
        rest: infer Rest extends string;
    }
        ? TakeDate<Rest, "-", null, Month> extends {
            take: infer IsoDate extends TwoDigitDate<"branded">;
            rest: infer Rest extends string;
        }
            ? Rest extends ""
                ? As<[
                    null,
                    Month,
                    IsoDate,
                    null
                ], ParsedDate>
                : Err<
                    `parse-date/leftover`,
                    `A string which appeared to be a IsoMonthDate string had trailing content which was unparsable [${Rest}]!`,
                    { parse: T; month: Month; date: IsoDate; rest: Rest }
                >
            : Err<
                `parse-date/date`,
                `Unable to parse the month of what appeared to be an IsoMonthDate string`,
                { parse: T; month: Month; rest: Rest }
            >
        : Err<
            `parse-date/month`,
            `A string which appeared to be a IsoMonthDate string with leading '--' presented an invalid month`,
            { parse: T }
        >;

type ParseFullDate<T extends string> = TakeYear<T> extends {
    take: infer Year extends FourDigitYear<"branded">;
    rest: infer Rest extends string;
}
    ? TakeMonth<Rest, "-"> extends {
        take: infer Month extends TwoDigitMonth<"branded">;
        rest: infer Rest extends string;
    }
        ? TakeDate<Rest, "-", Year, Month> extends {
            take: infer D extends TwoDigitDate<"branded">;
            rest: infer _Rest extends string;
        }
                ? As<
                    [
                        Year,
                        Month,
                        D,
                        null
                    ],
                    ParsedDate
                >


            : ErrContext<
                As<TakeDate<Rest, "-", Year, Month>, Error>,
                { year: Year; month: Month; rest: Rest }
            >
        : ErrContext<
            As<TakeMonth<Rest, "-">, Error>,
            { year: Year; rest: Rest }
        >
    : ErrContext<
        As<TakeYear<T>, Error>,
        { parse: T }
    >;

type ParseYear<T extends string> = IsFourDigitYear<T> extends true
    ? As<
        [
            FourDigitYear<As<T, `${number}`>>,
            null,
            null,
            null
        ],
        ParsedDate
    >
    : Err<
        `parse-date/year`,
        `A string which looked like an ISO year string was unable to be parsed!`,
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
            { parse: T; date: DatePart; time: TimePart }
        >
        : ParseTime<TimePart> extends Error
            ? Err<
                `parse-date/datetime`,
                `The time component of a DateTime string was invalid: ${ParseTime<TimePart>["message"]}`,
                { parse: T; date: DatePart; time: TimePart }
            >
            : ParseFullDate<DatePart> extends ParsedDate
                ? As<
                    [
                        As<ParseFullDate<DatePart>, ParsedDate>[0],
                        As<ParseFullDate<DatePart>, ParsedDate>[1],
                        As<ParseFullDate<DatePart>, ParsedDate>[2],
                        As<ParseTime<TimePart>, ParsedTime>
                    ],
                    ParsedDate
                >
                : never

    : Err<`parse-date/datetime`, `Invalid structure`, { parse: T }>;

type ParseYearMonth<T extends string> = TakeYear<T> extends {
    take: infer Year extends FourDigitYear<"branded">;
    rest: infer Rest extends string;
}
    ? TakeMonth<Rest, "-"> extends {
        take: infer Month extends TwoDigitMonth<"branded">;
        rest: infer Rest extends string;
    }
        ? Rest extends ""

            ? [
                Year,
                Month,
                null,
                null
            ]
            : Err<
                `parse-date/leftover`,
                `The year and month were parsed and validated but there is remaining text which can't be parsed: ${Rest}`,
                { year: Year; minute: Month; rest: Rest }
            >

        : Err<
            `parse-date/month`,
            `The month in what appeared to be a IsoYearMonth string was unable to be parsed`,
            { parse: T; year: Year; rest: Rest }
        >
    : Err<
        `parse-date/year`,
        `The year in what started out as a IsoYearMonth string was unable to be parsed`,
        { parse: T }
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
 *
 * Returns the type `ParsedDate` or `Error` if `T` couldn't be parsed as
 * a ISO date/datetime type.
 */
export type ParseDate<
    T,
    U = Unbrand<T>
> = U extends string
    ? string extends U
        ? ParsedDate | Error // wide string
        : U extends `--${infer Rest extends string}`
            ? ParseMonthDate<Rest>
        // ----
            : U extends `-${infer Rest extends string}`
                ? ParseYearMonth<Rest>
            // ----
                : U extends `${string}T${string}`
                    ? ParseDateTime<U>
                    : StrLen<U> extends 4
                        ? ParseYear<U>
                        : ParseFullDate<U>
    : Err<
        `parse-date/wrong-type`,
        `A non-string type was passed into ParseDate<T>!`
    >;
