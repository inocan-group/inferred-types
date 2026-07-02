type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

/**
 * Boolean operator which validates that `T` is a
 * `FourDigitYear` found in ISO strings.
 */
export type IsFourDigitYear<T> = T extends string
    ? string extends T
        ? boolean
        : T extends `${Digit}${Digit}${Digit}${Digit}`
            ? true
            : false
    : false;
