import type {
    AsNumber,
    NumericChar,
    ToString,
} from "inferred-types/types";

type IncrementDigit<T extends string> = T extends "0" ? { digit: "1"; carry: false }
    : T extends "1" ? { digit: "2"; carry: false }
        : T extends "2" ? { digit: "3"; carry: false }
            : T extends "3" ? { digit: "4"; carry: false }
                : T extends "4" ? { digit: "5"; carry: false }
                    : T extends "5" ? { digit: "6"; carry: false }
                        : T extends "6" ? { digit: "7"; carry: false }
                            : T extends "7" ? { digit: "8"; carry: false }
                                : T extends "8" ? { digit: "9"; carry: false }
                                    : T extends "9" ? { digit: "0"; carry: true }
                                        : never;

type IncrementString<
    T extends string,
    Acc extends string = "",
> = T extends `${infer Rest}${NumericChar}`
    ? T extends `${Rest}${infer Digit extends NumericChar}`
        ? IncrementDigit<Digit> extends { digit: infer Next extends string; carry: infer Carry extends boolean }
            ? Carry extends true
                ? IncrementString<Rest, `${Next}${Acc}`>
                : `${Rest}${Next}${Acc}`
            : never
        : never
    : `1${Acc}`;

/**
 * **Increment**`<T>`
 *
 * Allows a number -- or a string literal of a number -- to be _incremented_
 * by one.
 * ```ts
 * // 2
 * type T = Increment<1>;
 * // "2"
 * type T = Increment<"1">;
 * ```
 */
export type Increment<T extends number | `${number}`> = number extends T
    ? number
    : T extends number
        ? `${T}` extends `${string}.${string}` | `-${string}`
            ? number
            : AsNumber<IncrementString<`${T}`>>
    : T extends `${number}`
        ? string extends T
            ? `${number}`
            : T extends `${string}.${string}` | `-${string}`
                ? `${number}`
                : ToString<Increment<AsNumber<T>>>
        : never;
