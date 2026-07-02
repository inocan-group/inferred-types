type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type ValidTwoDigitMonth = `0${Exclude<Digit, "0">}` | `1${"0" | "1" | "2"}`;

/**
 * Boolean operator which tests whether `T` is a valid
 * ISO month representation.
 *
 * - if it is then it can be badged `TwoDigitMonth<"branded">`
 */
export type IsTwoDigitMonth<T> = T extends string
    ? string extends T
        ? boolean
        : T extends ValidTwoDigitMonth
            ? true
            : false
    : false;
