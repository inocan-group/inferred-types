import type { IsWideString, Replace, TwoDigitSecond } from "inferred-types/types";

/**
 * **TakeSeconds**`<T, [TOpt]>`
 *
 * Looks for `TwoDigitSecond` at front of the string and if it finds
 * it will return:
 *
 * - `[ TwoDigitSecond, Rest ]`
 */
export type TakeSeconds<
    T extends string,
> = IsWideString<T> extends true
    ? string
    : T extends `${TwoDigitSecond}${infer Rest extends string}`
        ? Replace<T, Rest, ""> extends TwoDigitSecond
            ? [ Replace<T, Rest, "">, Rest ]
            : [ undefined, T ]
        : [ undefined, T ];
