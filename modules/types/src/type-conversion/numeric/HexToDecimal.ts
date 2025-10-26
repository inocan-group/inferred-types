import type { AddPositive, AsNumber, Chars, Err, HexadecimalChar, Multiply } from "inferred-types/types";
import type { As, IsHexadecimal } from "types/boolean-logic";

type H2D<T extends HexadecimalChar> = Lowercase<T> extends "f"
    ? 15
    : Lowercase<T> extends "e"
        ? 14
        : Lowercase<T> extends "d"
            ? 13
            : Lowercase<T> extends "c"
                ? 12
                : Lowercase<T> extends "b"
                    ? 11
                    : Lowercase<T> extends "a"
                        ? 10
                        : AsNumber<T>;

type _HexToDecimalArray<
    T extends readonly HexadecimalChar[]
> = As<{
    [K in keyof T]: H2D<T[K]>
}, readonly number[]>;

type DecimalArrayToDecimal<
    T extends readonly number[],
    V extends readonly number[] = []
> = T extends [
    infer A extends number,
    infer B extends number,
    ...infer Rest extends readonly number[]
]
    ? Multiply<A, 16> extends infer HigherOrder extends number
        ? AddPositive<HigherOrder, B> extends infer Value extends number
            ? DecimalArrayToDecimal<
                Rest,
                [...V, Value]
            >
            : never
        : never
    : T extends [ infer A extends number ]
        ? [...V, A]
        : V
;

/**
 * **HexToDecimal**`<T>`
 *
 * Iterates left-to-right, peeling off two hexadecimal digits at a time
 * until there are only 0 or 1 digits left (adds final digit if 1 is left).
 * What is left is an array of decimal numbers ranging from 0-255.
 *
 * ```ts
 * // [15]
 * type T1 = HexToDecimal<"f">;
 * // [255]
 * type T2 = HexToDecimal<"ff">
 * // [255]
 * type T3 = HexToDecimal<"0xFF">
 * // [255, 238, 9]
 * type T4 = HexToDecimal<"ffee09">
 * ```
 */
export type HexToDecimal<T extends string | number> = T extends number
    ? number extends T
        ? number[]
        : [AsNumber<`${T}`>]
    : T extends `0x${infer Rest}`
        ? HexToDecimal<Rest>
        : T extends ""
            ? [0]
            : string extends T
                ? number[] | Err<"invalid-type/hexadecimal">
                : IsHexadecimal<T> extends true
                    ? string extends T
                        ? number | Error
                        : Chars<As<T, string>> extends readonly HexadecimalChar[]
                            ? DecimalArrayToDecimal<
                                _HexToDecimalArray<
                                    Chars<As<T, string>>
                                >
                            >
                            : never
                    : Err<"invalid-type/hexadecimal">;

/**
 * HexToDecimalArray<T>
 *
 * convert a hexadecimal number into an array of decimal numbers
 * on a digit by digit basis.
 *
 * **Related:** `HexToDecimal`
 */
export type HexToDecimalArray<T extends string> = string extends T
    ? number | Error
    : T extends `0x${infer Rest}`
        ? HexToDecimalArray<Rest>
        : T extends ""
            ? [0]
            : IsHexadecimal<T> extends true
                ? Chars<As<T, string>> extends readonly HexadecimalChar[]
                    ? _HexToDecimalArray<
                        Chars<As<T, string>>
                    >
                    : never
                : Err<"invalid-type/hexadecimal">;
