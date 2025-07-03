import type {
    And,
    As,
    Err,
    IsUndefined,
    IsWideString,
    StripLeading,
    TakeHours,
    TakeMilliseconds,
    TakeMinutes,
    TakeSeconds,
    TakeTimezone,
    ThreeDigitMillisecond,
    TimeZone,
    TwoDigitHour,
    TwoDigitMinute,
    TwoDigitSecond
} from "inferred-types/types";

/**
 * a successfully parsed **ISO Time** string.
 */
export type ParsedTime = [
    hour: TwoDigitHour,
    minute: TwoDigitMinute,
    second: TwoDigitSecond | undefined,
    millisecond: ThreeDigitMillisecond | undefined,
    tz: TimeZone<"strong"> | undefined
];

type X = TakeHours<"28:30"> extends [
    infer Hour extends TwoDigitHour,
    infer Rest extends string
] ? [Hour,Rest] : "no";

/**
 * **ParseTime**`<T>`
 *
 * Tries to parse `T` as an ISO Time. If successful it will result in a
 * tuple of the form of:
 *
 * - `[ Hour, Minute, Second, Millisecond, TZ ]`
 *
 * - Values which are not represented are set to `undefined`.
 * - If it can't be parsed then an Error<"parse/time"> is returned.
 */
export type ParseTime<
    T extends string,
> = As<
    IsWideString<T> extends true
        ? Err<
            "parse/time",
            `Can't parse a wide string type into an ISO Time!`
        >
        : T extends `${number}:${number}${string}`
        ? TakeHours<T> extends [
            infer Hour extends TwoDigitHour,
            infer Rest extends string
        ]
            ? IsUndefined<Hour> extends true
                ? Err<
                    `parse-time/hour`,
                    `The value passed in did not lead with a two digit value that could be parsed into 'hours'.`,
                    { parse: Rest }
                >
            : TakeMinutes<StripLeading<Rest, ":">> extends [
                infer Min extends TwoDigitMinute,
                infer Rest extends string
            ]
                ? IsUndefined<Min> extends true
                    ? Err<
                        `parse-time/min`,
                        `The value passed in had hours but couldn't parse out a two digit minutes value: ${Rest}`,
                        { parse: T, rest: Rest }
                    >
                : TakeSeconds<StripLeading<Rest, ":">> extends [
                    infer Sec extends TwoDigitSecond,
                    infer Rest extends string
                ]
                    // Valid seconds and appears to have Milliseconds
                    ? And<[Rest extends `.${infer Rest}` ? true : false, Sec extends TwoDigitSecond ? true : false]> extends true
                        ? TakeMilliseconds<StripLeading<Rest, ".">> extends [
                            infer MS extends ThreeDigitMillisecond,
                            infer Rest extends string
                        ]
                            ? MS extends undefined
                                ? Err<
                                    `parse-time/ms`,
                                    `The milliseconds value was invalid in this time-like string!`,
                                    { parse: T, rest: Rest }
                                >
                            : Rest extends ""
                                ? [ Hour, Min, Sec, MS, undefined ]
                            : Rest extends TimeZone<"strong">
                                ? [ Hour, Min, Sec, MS, Rest ]
                                : Err<
                                    `parse-time/leftover`,
                                    `Parsed hour, minute, seconds, and milliseconds but the leftover content was not recognized: '${Rest}'`,
                                    {
                                        parse: T;
                                        hour: Hour;
                                        minute: Min;
                                        second: Sec;
                                        ms: MS;
                                        rest: Rest;
                                    }
                                >
                        : Rest extends ""
                            ? Sec extends TwoDigitSecond
                                ? [ Hour, Min, Sec, undefined, undefined ]
                                : Err<
                                    `parse-time/sec`,
                                    `After parsing hours and minutes, there was trouble in parsing out what appeared to be seconds: ${Rest}`,
                                    { parse: T, rest: Rest, hour: Hour, minute: Min }
                                >
                        : Rest extends TimeZone<"strong">
                                ? [ Hour, Min, Sec, undefined, Rest ]
                                : Err<
                                    `parse-time/leftover`,
                                    `Problems parsing an ISO Time string after extracting hours, minutes, and seconds: ${Rest}`,
                                    {
                                        parse: T;
                                        hour: Hour;
                                        minute: Min;
                                        second: Sec;
                                        rest: Rest;
                                    }
                                >
                    : Rest extends TimeZone<"strong">
                        ? [ Hour, Min, Sec, undefined, Rest ]
                        : Rest extends ""
                            ? [ Hour, Min, Sec, undefined, undefined ]
                            : Err<
                                `parse-time/sec`,
                                `Problems parsing an ISO Time string after extracting hours and minutes: ${Rest}`,
                                {
                                    parse: T;
                                    hour: Hour;
                                    minute: Min;
                                    rest: Rest;
                                }
                            >
                : Err<
                    `parse-time/min`,
                    `Problem parsing an ISO Time string after getting hours: ${Rest}`,
                    {
                        parse: T;
                        hour: Hour;
                        rest: Rest;
                    }
                >
            : Err<
                `parse-time/min`,
                `Problems parsing string as ISO Time string: ${T}`,
                { parse: T, hour: Hour, rest: Rest }
            >
        : Err<
            `parse-time/structure`,
            `The value passed into the ParseTime<T> utility does not even start out as a valid structure for an ISO Time: ${T}`,
            { parse: T }
        >
    : Err<
            `parse-time/structure`,
            `The value passed into the ParseTime<T> utility does not even start out as a valid structure for an ISO Time: ${T}`,
            { parse: T }
    >,
    ParsedTime | Error
>;
