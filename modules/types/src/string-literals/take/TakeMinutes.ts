import type {
    IsWideString,
    Replace,
    TwoDigitMinute
} from "inferred-types/types";

/**
 * **TakeMinutes**`<T, [TOpt]>`
 *
 * Looks for `TwoDigitSecond` at front of the string and if it finds
 * it will return:
 *
 * - `[ TwoDigitMinute, Rest ]`
 */
export type TakeMinutes<
    T extends string,
> = IsWideString<T> extends true
    ? string
    : T extends `${TwoDigitMinute}${infer Rest extends string}`
        ? Replace<T, Rest, ""> extends TwoDigitMinute
            ? [ Replace<T, Rest, "">, Rest ]
            : [ undefined, T ]
        : [ undefined, T ];
