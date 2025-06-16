import { IsWideString, Replace, TwoDigitDate } from "inferred-types/types";




/**
 * **TakeDate**`<T, [TOpt]>`
 *
 * Looks for `TwoDigitDate` at front of the string and if it finds
 * it will return:
 *
 * - `[ TwoDigitMinute, Rest ]`
 */
export type TakeDate<
    T extends string,
> = IsWideString<T> extends true
? string
: T extends `${TwoDigitDate}${infer Rest extends string}`
? Replace<T, Rest, ""> extends TwoDigitDate
    ? [ Replace<T, Rest, "">, Rest ]
    : [ undefined, T ]
: [ undefined, T ];
