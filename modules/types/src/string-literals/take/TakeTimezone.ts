import type { IsWideString, Replace, TimezoneOffset, TwoDigitSecond } from "inferred-types/types";

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
    ? [TimezoneOffset<"strong"> | undefined, string]
    : T extends `${TimezoneOffset<"strong">}${infer Rest extends string}`
    ? Replace<T, Rest, ""> extends TimezoneOffset<"strong">
    ? [Replace<T, Rest, "">, Rest]
    : [undefined, T]
    : [undefined, T];
