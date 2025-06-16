import { IsWideString, Replace,  TwoDigitMonth } from "inferred-types/types";



/**
 * **TakeMonth**`<T, [TOpt]>`
 *
 * Looks for `TwoDigitSecond` at front of the string and if it finds
 * it will return:
 *
 * - `[ TwoDigitMinute, Rest ]`
 */
export type TakeMonth<
    T extends string,
> = IsWideString<T> extends true
? string
: T extends `${TwoDigitMonth}${infer Rest extends string}`
? Replace<T, Rest, ""> extends TwoDigitMonth
    ? [ Replace<T, Rest, "">, Rest ]
    : [ undefined, T ]
: [ undefined, T ];
