import type { NumericChar } from "types/string-literals";

/**
 * Boolean operator which validates that `T` is a
 * `FourDigitYear` found in ISO strings.
 */
export type IsFourDigitYear<T> = T extends string
    ? string extends T
        ? boolean
        : T extends `${NumericChar}${infer Rest}`
            ? Rest extends `${NumericChar}${infer Rest}`
                ? Rest extends `${NumericChar}${infer Rest}`
                    ? Rest extends `${NumericChar}${infer Rest}`
                        ? Rest extends ""
                            ? true
                            : false
                        : false
                    : false
                : false
            : false
    : false;
