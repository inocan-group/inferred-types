import { As, Concat, Err,  IsWideString, NumericChar,  Or,  Replace,  RetainWhile, Split,  StripAfter,  StripLeading, StripWhile, TakeHours, TakeMilliseconds, TakeMinutes, TakeSeconds, ThreeDigitMillisecond,  TimeZone, TwoDigitHour, TwoDigitMinute, TwoDigitMonth, TwoDigitSecond } from "inferred-types/types";
import { TakeNumeric } from "src/string-literals/take/TakeNumeric";

type OptTZ = TimeZone | "";

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
    : TakeHours<T> extends [
        infer Hour extends TwoDigitHour,
        infer Rest extends string
    ]
        ? TakeMinutes<StripLeading<Rest, ":">> extends [
            infer Min extends TwoDigitMinute,
            infer Rest extends string
        ]
            ? TakeSeconds<StripLeading<Rest, ":">> extends [
                infer Sec extends TwoDigitSecond,
                infer Rest extends string
            ]
                ? TakeMilliseconds<StripLeading<Rest, ".">> extends [
                    infer MS extends ThreeDigitMillisecond,
                    infer Rest extends string
                ]
                    ? Rest extends ""
                        ? [ Hour, Min, Sec, MS, undefined ]
                    : Rest extends TimeZone<"strong">
                        ? [ Hour, Min, Sec, MS, Rest ]
                    : Err<
                        `parse/time`,
                        `Problems parsing an ISO Time string after extracting HH:MM:SS.ms: ${Rest}`,
                        {
                            hour: Hour,
                            minute: Min,
                            second: Sec,
                            ms: MS,
                            rest: Rest
                        }
                    >
                : Rest extends ""
                    ? [ Hour, Min, Sec, undefined, undefined ]
                : Rest extends TimeZone<"strong">
                    ? [ Hour, Min, Sec, undefined, Rest ]
                : Err<
                    `parse/time`,
                    `Problems parsing an ISO Time string after extracting HH:MM:SS: ${Rest}`,
                    {
                        hour: Hour,
                        minute: Min,
                        second: Sec,
                        rest: Rest
                    }
                >
            : Rest extends TimeZone<"strong">
                ? [ Hour, Min, undefined, undefined, Rest ]
            : Rest extends ""
                ? [ Hour, Min, undefined, undefined, undefined ]
            : Err<
                `parse/time`,
                `Problems parsing an ISO Time string after extracting hours and minutes: ${Rest}`,
                {
                    hour: Hour,
                    minute: Min,
                    rest: Rest
                }
            >
        : Err<
            `parse/time`,
            `Problem parsing an ISO Time string after getting hours: ${Rest}`,
            {
                hour: Hour,
                rest: Rest
            }
        >
    : Err<
        `parse/time`,
        `Problems parsing string as ISO Time string: ${T}`,
        { string: T }
    >,
    ParsedTime | Error
>
