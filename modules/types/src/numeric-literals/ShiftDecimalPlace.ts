import type {
    As,
    Contains,
    IsNegativeNumber,
    IsNumericLiteral
} from "types/boolean-logic";
import type { Abs, NumberLike } from "types/numeric-literals";
import type { Split } from "types/string-literals";
import type { AsNumber } from "types/type-conversion";

// Optimized for common shifting cases without deep recursion
type AppendZeros<N extends number>
    = N extends 0 ? ""
        : N extends 1 ? "0"
            : N extends 2 ? "00"
                : N extends 3 ? "000"
                    : N extends 4 ? "0000"
                        : N extends 5 ? "00000"
                            : N extends 6 ? "000000"
                                : N extends 7 ? "0000000"
                                    : N extends 8 ? "00000000"
                                        : string;

type PrependZeros<N extends number>
    = N extends 0 ? ""
        : N extends 1 ? "0"
            : N extends 2 ? "00"
                : N extends 3 ? "000"
                    : string;

// Simple multiplication by powers of 10 (right shift)
type MultiplyBy10Power<
    T extends `${number}`,
    U extends number
> = U extends 0
    ? T
    : Contains<T, "."> extends true
        ? Split<T, "."> extends [infer Left extends string, infer Right extends string]
            ? `${Left}${Right}`
            : T
        : `${T}${AppendZeros<U>}`;

// Simple division by powers of 10 (left shift)
type DivideBy10Power<
    T extends `${number}`,
    U extends number
> = U extends 0
    ? T
    : Contains<T, "."> extends true
        ? T // Keep existing decimal as-is
        : U extends 1
            ? T extends `${infer First}${infer Rest}`
                ? Rest extends ""
                    ? `0.${First}`
                    : `${First}.${Rest}`
                : `0.${T}`
            : U extends 2
                ? T extends `${infer A}${infer B}${infer Rest}`
                    ? Rest extends ""
                        ? `0.${A}${B}`
                        : `${A}.${B}${Rest}`
                    : T extends `${infer Single}`
                        ? `0.0${Single}`
                        : `0.0${T}`
                : U extends 3
                    ? T extends `${infer A}${infer B}${infer C}${infer Rest}`
                        ? Rest extends ""
                            ? `0.${A}${B}${C}`
                            : `${A}.${B}${C}${Rest}`
                        : `0.00${T}`
                    : `0.${PrependZeros<U>}${T}`;

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
>
    // Fast bailouts
    = U extends 0 ? T
        : T extends 0 ? T
            : number extends U ? `${number}`

            // Core logic - much simpler
                : IsNegativeNumber<U> extends true
                    ? T extends number
                        ? `${T}` extends `${number}.${number}`
                            ? number // decimal numbers lose precision
                            : IsNumericLiteral<T> extends true
                                ? AsNumber<DivideBy10Power<`${T}`, Abs<U>>>
                                : number
                        : DivideBy10Power<As<T, `${number}`>, Abs<U>>
                    : T extends number
                        ? `${T}` extends `${number}.${number}`
                            ? number // decimal numbers lose precision
                            : IsNumericLiteral<T> extends true
                                ? AsNumber<MultiplyBy10Power<`${T}`, U>>
                                : number
                        : MultiplyBy10Power<As<T, `${number}`>, U>;
