import { IsWideString, Replace, TwoDigitHour } from "inferred-types/types";



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
? string
: T extends `${TwoDigitHour}${infer Rest extends string}`
? Replace<T, Rest, ""> extends TwoDigitHour
    ? [ Replace<T, Rest, "">, Rest ]
    : [ undefined, T ]
: [ undefined, T ];
