import type { IsWideString, Replace, TimeZone, TwoDigitSecond } from "inferred-types/types";

/**
 * **TakeTimezone**`<T>`
 *
 * Looks for `TimeZone` at front of the string and if it finds
 * it will return:
 *
 * - `[ TimeZone<"strong">, Rest ]`
 */
export type TakeTimezone<
    T extends string,
> = IsWideString<T> extends true
    ? [ TimeZone<"strong"> | undefined, string ]
    : T extends `${TimeZone<"strong">}${infer Rest extends string}`
        ? Replace<T, Rest, ""> extends TimeZone<"strong">
            ? [ Replace<T, Rest, "">, Rest ]
            : [ undefined, T ]
        : [ undefined, T ];
