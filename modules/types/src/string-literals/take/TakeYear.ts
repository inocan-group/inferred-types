import type { FourDigitYear, IsWideString, Replace } from "inferred-types/types";

/**
 * **TakeYear**`<T>`
 *
 * Looks for `TwoDigitSecond` at front of the string and if it finds
 * it will return:
 *
 * - `[ FourDigitYear | "", Rest ]`
 */
export type TakeYear<
    T extends string,
> = IsWideString<T> extends true
    ? string
    : T extends `${FourDigitYear<"strong">}${infer Rest extends string}`
        ? Replace<T, Rest, ""> extends FourDigitYear<"strong">
            ? [ Replace<T, Rest, "">, Rest ]
            : [ undefined, T ]
        : T extends `-${infer Rest extends string}`
            ? [ "", Rest ]
            : [ undefined, T ];
