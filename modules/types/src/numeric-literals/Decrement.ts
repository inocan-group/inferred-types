import type { AsNumber, NumericChar } from "inferred-types/types";

type DecrementDigit<T extends string> = T extends "0" ? { digit: "9"; borrow: true }
    : T extends "1" ? { digit: "0"; borrow: false }
        : T extends "2" ? { digit: "1"; borrow: false }
            : T extends "3" ? { digit: "2"; borrow: false }
                : T extends "4" ? { digit: "3"; borrow: false }
                    : T extends "5" ? { digit: "4"; borrow: false }
                        : T extends "6" ? { digit: "5"; borrow: false }
                            : T extends "7" ? { digit: "6"; borrow: false }
                                : T extends "8" ? { digit: "7"; borrow: false }
                                    : T extends "9" ? { digit: "8"; borrow: false }
                                        : never;

type StripLeadingZeros<T extends string> = T extends "0"
    ? "0"
    : T extends `0${infer Rest}`
        ? StripLeadingZeros<Rest>
        : T extends ""
            ? "0"
            : T;

type DecrementString<
    T extends string,
    Acc extends string = "",
    Depth extends readonly unknown[] = [],
> = Depth["length"] extends 32
    ? `${number}`
    : T extends "0" | ""
    ? "0"
    : T extends `${infer Rest}${NumericChar}`
        ? T extends `${Rest}${infer Digit extends NumericChar}`
            ? DecrementDigit<Digit> extends { digit: infer Next extends string; borrow: infer Borrow extends boolean }
                ? Borrow extends true
                    ? Rest extends ""
                        ? "0"
                        : DecrementString<Rest, `${Next}${Acc}`, [unknown, ...Depth]>
                    : StripLeadingZeros<`${Rest}${Next}${Acc}`>
                : never
            : never
        : never;

/**
 * **Decrement**`<T>`
 *
 * Allows a number -- or a string literal of a number -- to be _decremented_
 * by one.
 *
 * - Once reaching zero the Decrement<T> utility will stay at 0
 */
export type Decrement<T extends number | `${number}`> = number extends T
    ? number
    : T extends number
        ? `${T}` extends `${string}.${string}` | `-${string}`
            ? number
            : AsNumber<DecrementString<`${T}`>>
    : T extends `${number}`
        ? string extends T
            ? `${number}`
            : T extends `${string}.${string}` | `-${string}`
                ? `${number}`
                : DecrementString<T>
        : never;
