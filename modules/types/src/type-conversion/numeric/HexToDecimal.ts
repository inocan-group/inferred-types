import type { Chars, Err, HexadecimalChar } from "inferred-types/types";
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
                        : Lowercase<T> extends "9"
                            ? 9
                            : Lowercase<T> extends "8"
                                ? 8
                                : Lowercase<T> extends "7"
                                    ? 7
                                    : Lowercase<T> extends "6"
                                        ? 6
                                        : Lowercase<T> extends "5"
                                            ? 5
                                            : Lowercase<T> extends "4"
                                                ? 4
                                                : Lowercase<T> extends "3"
                                                    ? 3
                                                    : Lowercase<T> extends "2"
                                                        ? 2
                                                        : Lowercase<T> extends "1"
                                                            ? 1
                                                            : 0;

type _HexToDecimalArray<
    T extends readonly HexadecimalChar[]
> = As<{
    [K in keyof T]: H2D<T[K]>
}, readonly number[]>;

type HexByte<
    H extends HexadecimalChar,
    L extends HexadecimalChar,
> = Lowercase<H> extends "0" ? H2D<L>
    : Lowercase<H> extends "1" ? [
        16, 17, 18, 19, 20, 21, 22, 23,
        24, 25, 26, 27, 28, 29, 30, 31
    ][H2D<L>]
        : Lowercase<H> extends "2" ? [
            32, 33, 34, 35, 36, 37, 38, 39,
            40, 41, 42, 43, 44, 45, 46, 47
        ][H2D<L>]
            : Lowercase<H> extends "3" ? [
                48, 49, 50, 51, 52, 53, 54, 55,
                56, 57, 58, 59, 60, 61, 62, 63
            ][H2D<L>]
                : Lowercase<H> extends "4" ? [
                    64, 65, 66, 67, 68, 69, 70, 71,
                    72, 73, 74, 75, 76, 77, 78, 79
                ][H2D<L>]
                    : Lowercase<H> extends "5" ? [
                        80, 81, 82, 83, 84, 85, 86, 87,
                        88, 89, 90, 91, 92, 93, 94, 95
                    ][H2D<L>]
                        : Lowercase<H> extends "6" ? [
                            96, 97, 98, 99, 100, 101, 102, 103,
                            104, 105, 106, 107, 108, 109, 110, 111
                        ][H2D<L>]
                            : Lowercase<H> extends "7" ? [
                                112, 113, 114, 115, 116, 117, 118, 119,
                                120, 121, 122, 123, 124, 125, 126, 127
                            ][H2D<L>]
                                : Lowercase<H> extends "8" ? [
                                    128, 129, 130, 131, 132, 133, 134, 135,
                                    136, 137, 138, 139, 140, 141, 142, 143
                                ][H2D<L>]
                                    : Lowercase<H> extends "9" ? [
                                        144, 145, 146, 147, 148, 149, 150, 151,
                                        152, 153, 154, 155, 156, 157, 158, 159
                                    ][H2D<L>]
                                        : Lowercase<H> extends "a" ? [
                                            160, 161, 162, 163, 164, 165, 166, 167,
                                            168, 169, 170, 171, 172, 173, 174, 175
                                        ][H2D<L>]
                                            : Lowercase<H> extends "b" ? [
                                                176, 177, 178, 179, 180, 181, 182, 183,
                                                184, 185, 186, 187, 188, 189, 190, 191
                                            ][H2D<L>]
                                                : Lowercase<H> extends "c" ? [
                                                    192, 193, 194, 195, 196, 197, 198, 199,
                                                    200, 201, 202, 203, 204, 205, 206, 207
                                                ][H2D<L>]
                                                    : Lowercase<H> extends "d" ? [
                                                        208, 209, 210, 211, 212, 213, 214, 215,
                                                        216, 217, 218, 219, 220, 221, 222, 223
                                                    ][H2D<L>]
                                                        : Lowercase<H> extends "e" ? [
                                                            224, 225, 226, 227, 228, 229, 230, 231,
                                                            232, 233, 234, 235, 236, 237, 238, 239
                                                        ][H2D<L>]
                                                            : [
                                                                240, 241, 242, 243, 244, 245, 246, 247,
                                                                248, 249, 250, 251, 252, 253, 254, 255
                                                            ][H2D<L>];

type HexCharsToDecimal<
    T extends readonly HexadecimalChar[],
    V extends readonly number[] = [],
    TDepth extends readonly unknown[] = [],
> = T extends readonly [
    infer A extends HexadecimalChar,
    infer B extends HexadecimalChar,
    ...infer Rest extends readonly HexadecimalChar[]
]
    ? TDepth["length"] extends 64
        ? number[]
        : HexCharsToDecimal<Rest, [...V, HexByte<A, B>], [...TDepth, unknown]>
    : T extends readonly [infer A extends HexadecimalChar]
        ? [...V, H2D<A>]
        : V;

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
        : [T]
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
                            ? HexCharsToDecimal<Chars<As<T, string>>>
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
