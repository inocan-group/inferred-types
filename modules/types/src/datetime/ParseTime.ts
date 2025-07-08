import type {
    As,
    Err,
    IsOk,
    TakeHours,
    TakeMilliseconds,
    TakeMinutes,
    TakeSeconds,
    TakeTimezone,
    ThreeDigitMillisecond,
    TimezoneOffset,
    TwoDigitHour,
    TwoDigitMinute,
    TwoDigitSecond
} from "inferred-types/types";

/**
 * a successfully parsed **ISO Time** string.
 */
export type ParsedTime = [
        hour: TwoDigitHour<"branded">,
        minute: TwoDigitMinute<"branded">,
        second: TwoDigitSecond<"branded"> | null,
        millisecond: ThreeDigitMillisecond<"branded"> | null,
        tz: TimezoneOffset<"branded" extends "strong" ? "strong" : "normal"> | null
];

type ValidateHoursMinutes<
    THours extends `${number}`,
    TMinutes extends `${number}`,
> = As<
    THours extends TwoDigitHour<"strong">
        ? TMinutes extends TwoDigitMinute<"strong">
            ? {
                hour: As<THours & TwoDigitHour<"branded">, TwoDigitHour<"branded">>;
                minute: As<TMinutes & TwoDigitMinute<"branded">, TwoDigitMinute<"branded">>;
            }
            : Err<
                `parse-time/minute`,
        `The minutes component of the ISO time was invalid: ${TMinutes}`,
        { hour: THours; minute: TMinutes }
            >
        : Err<
            `parse-time/hour`,
    `The hour component of the ISO time was initially parsed but found to be invalid: ${THours}`,
    { hour: THours; minute: TMinutes }
        >,
{
    hour: TwoDigitHour<"branded">;
    minute: TwoDigitMinute<"branded">;
} | Error
>;

type GetHoursMinutes<T extends string> = As<
    TakeHours<T> extends {
        take: infer Hour extends TwoDigitHour<"branded">;
        rest: infer Rest extends string;
    }
        ? TakeMinutes<Rest, ":"> extends {
            take: infer Minute extends TwoDigitMinute<"branded">;
            rest: infer Rest extends string;
        }
            ? {
                hour: As<
                Hour & TwoDigitHour<"branded">,
                    TwoDigitHour<"branded">
                >;
                minute: As<
                Minute & TwoDigitMinute<"branded">,
                    TwoDigitMinute<"branded">
                >;
                rest: Rest;
            }

            : Err<
                `parse-time/minute`,
            `could not parse out the minute component of this string: ${Rest}`,
            { parse: T; hour: Hour; rest: Rest }
            >
        : Err<
            `parse-time/invalid`,
            `the passed in string could not be parsed as an ISO Time string`,
            { parse: T }
        >,
    Error | {
        hour: TwoDigitHour<"branded">;
        minute: TwoDigitMinute<"branded">;
        rest: string;
    }
>;

/**
 * complete parsing of a time with Hour:Minute but not
 * seconds or milliseconds
 */
type ParseTimeWithMinutes<
    THours extends TwoDigitHour<"branded">,
    TMinutes extends TwoDigitMinute<"branded">,
    TRest extends string
> = TRest extends ""
    ? As<
        [
            THours,
            TMinutes,
            null,
            null,
            null
        ],
        ParsedTime
    >
    : TRest extends `:${infer Rest extends string}`
        ? ParseTimeWithSeconds<THours, TMinutes, Rest>
        : TakeTimezone<TRest> extends {
            take: infer TZ extends TimezoneOffset<"branded">;
            rest: infer Rest extends string;
        }
            ? Rest extends ""
                ? As<
                    [
                        THours,
                        TMinutes,
                        null,
                        null,
                        TZ
                    ],
                    ParsedTime
                >
                : Err<
                    `parse-time/leftover`,
            `Were able to parse out hours, minutes, and timezone but content still remains: ${Rest}`,
            { hours: THours; minute: TMinutes; tz: TZ; rest: Rest }
                >
            : Err<
                `parse-time/tz`,
        `Could not parse remaining content as timezone: ${TRest}`,
        { hours: THours; minutes: TMinutes; rest: TRest }
            >;

type ParseTimeWithSeconds<
    THours extends TwoDigitHour<"branded">,
    TMinutes extends TwoDigitMinute<"branded">,
    TRest extends string
> = TakeSeconds<TRest> extends {
    take: infer Second extends TwoDigitSecond<"branded">;
    rest: infer Rest extends string;
}
    ? Rest extends ""
        ? As<
            [
                THours,
                TMinutes,
                Second,
                null,
                null
            ],
            ParsedTime
        >
        : Rest extends `.${infer MillisRest}`
            ? ParseTimeWithMilliseconds<THours, TMinutes, Second, MillisRest>
            : TakeTimezone<Rest> extends {
                take: infer TZ extends TimezoneOffset<"branded">;
                rest: infer TZRest extends string;
            }
                ? TZRest extends ""
                    ? As<
                        [
                            THours,
                            TMinutes,
                            Second,
                            null,
                            TZ
                        ],
                        ParsedTime
                    >
                    : Err<
                        `parse-time/leftover`,
                `Was able to parse hours, minutes, seconds, and timezone but content still remains: ${TZRest}`,
                {
                    hour: THours;
                    minute: TMinutes;
                    second: Second;
                    tz: TZ;
                    rest: TZRest;
                }
                    >

                : Err<
                    `parse-time/tz`,
            `Was able to parse hours, minutes, and seconds but failed to parse remaining as a timezone offset: ${Rest}`,
            {
                hour: THours;
                minute: TMinutes;
                second: Second;
                rest: Rest;
            }
                >
    : Err<
        `parse-time/sec`,
    `Invalid second in ISO Time string: ${TRest}`,
    { hour: THours; minute: TMinutes; rest: TRest }
    >;

type ParseTimeWithMilliseconds<
    THours extends TwoDigitHour<"branded">,
    TMinutes extends TwoDigitMinute<"branded">,
    TSeconds extends TwoDigitSecond<"branded">,
    TRest extends `${string}`
> = TakeMilliseconds<TRest> extends {
    take: infer MS extends ThreeDigitMillisecond<"branded">;
    rest: infer Rest extends `${string}`;
}
    ? Rest extends ""
        ? As<
            [
                THours,
                TMinutes,
                TSeconds,
                MS,
                null
            ],
            ParsedTime
        >
        : TakeTimezone<Rest> extends {
            take: infer TZ extends TimezoneOffset<"branded">;
            rest: infer TZRest extends string;
        }
            ? TZRest extends ""
                ? As<
                    [
                        THours,
                        TMinutes,
                        TSeconds,
                        MS,
                        TZ
                    ],
                    ParsedTime
                >
                : Err<
                    "parse-time/leftover",
                `Parsed out hours, minutes, seconds, milliseconds, and timezone but content still remains: ${TZRest}`,
                { hour: THours; minute: TMinutes; second: TSeconds; ms: MS; tz: TZ; rest: TZRest }
                >
            : Err<
                "parse-time/tz",
            `Parsed out hours, minutes, seconds, and milliseconds, but the Timezone was invalid: ${Rest}`,
            { hour: THours; minute: TMinutes; second: TSeconds; ms: MS; rest: Rest }
            >
    : Err<
        `parse-time/ms`,
        `The string appeared to have milliseconds but upon validation it appears it is invalid: ${TRest}`,
        { hour: THours; minute: TMinutes; second: TSeconds; rest: TRest }
    >;

/**
 * **ParseTime**`<T, TComplexity>`
 *
 * Tries to parse `T` as an ISO Time. If successful it will result in a
 * tuple of the form of:
 *
 * - `[ Hour, Minute, Second, Millisecond, TZ ]`
 *
 * - Values which are not represented are set to `undefined`.
 * - If it can't be parsed then an Error<"parse/time"> is returned.
 *
 * **Complexity Levels:**
 * - `"weak"`: Fast, less type-safe fallbacks
 * - `"normal"`: Balanced performance and safety (default)
 * - `"strong"`: Full type safety, slower compilation
 */
export type ParseTime<
    T extends string
> = string extends T
    ? ParsedTime | Error
    : GetHoursMinutes<T> extends Error
        ? As<GetHoursMinutes<T>, Error>
        : ParseTimeWithMinutes<
            IsOk<GetHoursMinutes<T>>["hour"],
            IsOk<GetHoursMinutes<T>>["minute"],
            IsOk<GetHoursMinutes<T>>["rest"]
        >;
