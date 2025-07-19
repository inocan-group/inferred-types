import type { NonZeroNumericChar } from "types/string-literals";

/* eslint-disable ts/no-unused-vars, unused-imports/no-unused-vars  */

/**
 * Boolean operator which tests whether `T` is a valid
 * ISO month representation.
 *
 * - if it is then it can be badged `TwoDigitMonth<"branded">`
 */
export type IsTwoDigitMonth<T> = T extends string
? string extends T
    ? boolean
    : T extends `0${infer Rest}`
        ? Rest extends `${NonZeroNumericChar}${infer Rest}`
            ? Rest extends ""
                ? true
                : false
            : false
        : T extends `1${infer Rest}`
            ? Rest extends `${"0" | "1" | "2"}${infer Rest}`
                ? Rest extends ""
                    ? true
                    : false
                : false
            : false
: false;
