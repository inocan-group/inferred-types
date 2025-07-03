import type { Err, IsWideString, Replace, TwoDigitHour } from "inferred-types/types";

/**
 * **TakeHours**`<T>`
 *
 * Looks for `TwoDigitSecond` at front of the string and if it finds
 * it will return:
 *
 * - `[ TwoDigitMinute, Rest ]`
 */
export type TakeHours<
    T extends string,
> = IsWideString<T> extends true
    ? Err<
        `invalid-wide-type/take-hours`,
        `The call to TakeHours<T> was passed a wide string type which it can not operate on!`
    >
    : T extends `${TwoDigitHour}${infer Rest extends string}`
        ? Replace<T, Rest, ""> extends TwoDigitHour
            ? [ Replace<T, Rest, "">, Rest ]
            : [ undefined, T ]
        : [ undefined, T ];
