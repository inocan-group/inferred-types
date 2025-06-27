import type {
    EmptyObject,
    IsWideString,
    TakeNumeric,
    TakeNumericOptions,
    ThreeDigitMillisecond
} from "inferred-types/types";

/**
 * options available to `TakeMilliseconds`
 */
export type TakeMillisecondsOptions = TakeNumericOptions;

/**
 * **TakeMilliseconds**`<T, [TOpt]>`
 *
 * Looks for `TwoDigitSecond` at front of the string and if it finds
 * it will return:
 *
 * - `[ ThreeDigitMillisecond, Rest ]`
 */
export type TakeMilliseconds<
    T extends string,
    TOpt extends TakeMillisecondsOptions = EmptyObject
> = IsWideString<T> extends true
    ? [ undefined | ThreeDigitMillisecond, string ]
    : TakeNumeric<T, TOpt> extends [
        infer MS extends ThreeDigitMillisecond,
        infer Rest extends string
    ]
        ? [MS, Rest]
        : [undefined, T];
