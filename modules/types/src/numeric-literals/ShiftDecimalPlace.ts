import type {
    As,
    Contains,
    IsGreaterThan,
    IsNegativeNumber,
    IsNumericLiteral
} from "types/boolean-logic";
import type { Slice } from "types/lists";
import type { Abs, Decrement, NumberLike, Subtract } from "types/numeric-literals";
import type { Repeat, Split, StrLen } from "types/string-literals";
import type { AsNumber } from "types/type-conversion";

// Simple string slicing for our specific use case
type SliceAfter<T extends string, N extends number>
    = N extends 0 ? T
        : N extends 1 ? T extends `${string}${infer Rest}` ? Rest : ""
            : N extends 2 ? T extends `${string}${string}${infer Rest}` ? Rest : ""
                : N extends 3 ? T extends `${string}${string}${string}${infer Rest}` ? Rest : ""
                    : "";

type SliceBefore<T extends string, N extends number>
    = N extends 0 ? ""
        : N extends 1 ? T extends `${infer First}${string}` ? First : ""
            : N extends 2 ? T extends `${infer A}${infer B}${string}` ? `${A}${B}` : ""
                : N extends 3 ? T extends `${infer A}${infer B}${infer C}${string}` ? `${A}${B}${C}` : ""
                    : "";

/**
 * in effect this divides by multiples of 10
 */
type ShiftRight<
    T extends `${number}`,
    U extends number
> = number extends U
    ? `${number}`
    : Contains<T, "."> extends true
        ? Split<T, "."> extends [
            infer Left extends string,
            infer Right extends string
        ]
            ? U extends StrLen<Right>
                ? `${Left}${Right}`
                : IsGreaterThan<StrLen<Right>, U> extends true
                    ? `${Left}${Right}.${Slice<Right, U>}`
                    : Subtract<StrLen<Right>, U> extends infer Num extends number
                        ? `${Left}${Right}${Repeat<"0", Num>}`
                        : never
            : never
        : `${T}${Repeat<"0", U>}`;

/**
 * in effect this multiples by multiples of 10
 */
type ShiftLeft<
    T extends `${number}`,
    U extends number
> = number extends U
    ? `${number}`
    : Contains<T, "."> extends true
        // T is a decimal number
        ? Split<T, "."> extends [
            infer Left extends string,
            infer Right extends string
        ]
            ? U extends StrLen<Left>
                ? `0.${Left}${Right}`
                : IsGreaterThan<StrLen<Left>, U> extends true
                    ? Subtract<StrLen<Left>, U> extends infer Num extends number
                        ? `${Slice<Left, 0, Num>}.${Slice<Left, Num>}${Right}`
                        : "baz"
                    : Subtract<StrLen<Left>, U> extends infer Num extends number
                        ? `.${Repeat<"0", Num>}${Left}${Right}`
                        : "foo"
            : "bar"
        // T is an integer
        : IsGreaterThan<StrLen<T>, U> extends true
            ? Subtract<StrLen<T>, U> extends infer Delta extends number
                ? `${SliceBefore<T, Delta>}.${SliceAfter<T, Delta>}`
                : never
            : StrLen<T> extends U
                ? `0.${T}`
                : Subtract<U, StrLen<T>> extends infer Delta extends number
                    ? `0.${Repeat<"0", Delta>}${T}`
                    : `0.${Repeat<"0", Decrement<U>>}${T}`;

/**
 * **ShiftDecimalPlace**`<T,U>`
 *
 * Shift a number's decimal place left or right based on the numeric
 * value of `U`.
 *
 * - a _positive_ value in `U` shifts the decimal place to the right
 * (in effect _multiplying_ by a factor of 10)
 * - a _negative_ value in `U` shifts the decimal place to the left
 * (in effect _dividing_ by a factor of 10)
 *
 * If `T` or `U` are a wide type then this utility will return the
 * appropriate wide response but when literals are passed in you
 * should always get a literal `NumberLike` value back.
 *
 * ```ts
 * // 12345
 * type IntValue = ShiftDecimalPlace<"123.45", 2>;
 * ```
 */
export type ShiftDecimalPlace<
    T extends NumberLike,
    U extends number
> = U extends 0
    ? T
    : T extends 0
        ? T
        : IsNegativeNumber<U> extends true
        // Negative -> shift left
            ? T extends number
                ? `${T}` extends `${number}.${number}`
                    ? number // Decimal numbers lose precision
                    : T extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 50 | 100 | 123 | 500 | 1000
                        ? AsNumber<ShiftLeft<`${T}`, Abs<U>>>
                        : IsNumericLiteral<T> extends true
                            ? AsNumber<ShiftLeft<`${T}`, Abs<U>>>
                            : number
                : ShiftLeft<As<T, `${number}`>, Abs<U>>
        // Positive -> shift right
            : T extends number
                ? `${T}` extends `${number}.${number}`
                    ? number // Decimal numbers lose precision
                    : IsNumericLiteral<T> extends true
                        ? AsNumber<ShiftRight<`${T}`, U>>
                        : number
                : ShiftRight<As<T, `${number}`>, U>;
