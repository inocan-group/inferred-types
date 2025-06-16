import { IsWideString, Replace, TakeNumeric, TakeNumericOptions, TwoDigitMinute } from "inferred-types/types";


export type TakeMinutesOptions = TakeNumericOptions;


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
    TOpt extends TakeMinutesOptions = {}
> = IsWideString<T> extends true
? string
: T extends `${TwoDigitMinute}${infer Rest extends string}`
? Replace<T, Rest, ""> extends TwoDigitMinute
    ? [ Replace<T, Rest, "">, Rest ]
    : [ undefined, T ]
: [ undefined, T ];
