import type { NumberLike } from "types/numeric-literals/NumberLike";
import type { AsNumber } from "types/type-conversion";

// Fast lookup for common single-digit comparisons
type SimpleCompareMap = {
    "0": { "0": "equal"; "1": "less"; "2": "less"; "3": "less"; "4": "less"; "5": "less"; "6": "less"; "7": "less"; "8": "less"; "9": "less"; "10": "less" };
    "1": { "0": "greater"; "1": "equal"; "2": "less"; "3": "less"; "4": "less"; "5": "less"; "6": "less"; "7": "less"; "8": "less"; "9": "less"; "10": "less" };
    "2": { "0": "greater"; "1": "greater"; "2": "equal"; "3": "less"; "4": "less"; "5": "less"; "6": "less"; "7": "less"; "8": "less"; "9": "less"; "10": "less" };
    "3": { "0": "greater"; "1": "greater"; "2": "greater"; "3": "equal"; "4": "less"; "5": "less"; "6": "less"; "7": "less"; "8": "less"; "9": "less"; "10": "less" };
    "4": { "0": "greater"; "1": "greater"; "2": "greater"; "3": "greater"; "4": "equal"; "5": "less"; "6": "less"; "7": "less"; "8": "less"; "9": "less"; "10": "less" };
    "5": { "0": "greater"; "1": "greater"; "2": "greater"; "3": "greater"; "4": "greater"; "5": "equal"; "6": "less"; "7": "less"; "8": "less"; "9": "less"; "10": "less" };
    "6": { "0": "greater"; "1": "greater"; "2": "greater"; "3": "greater"; "4": "greater"; "5": "greater"; "6": "equal"; "7": "less"; "8": "less"; "9": "less"; "10": "less" };
    "7": { "0": "greater"; "1": "greater"; "2": "greater"; "3": "greater"; "4": "greater"; "5": "greater"; "6": "greater"; "7": "equal"; "8": "less"; "9": "less"; "10": "less" };
    "8": { "0": "greater"; "1": "greater"; "2": "greater"; "3": "greater"; "4": "greater"; "5": "greater"; "6": "greater"; "7": "greater"; "8": "equal"; "9": "less"; "10": "less" };
    "9": { "0": "greater"; "1": "greater"; "2": "greater"; "3": "greater"; "4": "greater"; "5": "greater"; "6": "greater"; "7": "greater"; "8": "greater"; "9": "equal"; "10": "less" };
    "10": { "0": "greater"; "1": "greater"; "2": "greater"; "3": "greater"; "4": "greater"; "5": "greater"; "6": "greater"; "7": "greater"; "8": "greater"; "9": "greater"; "10": "equal" };
};

/**
 * **CompareNumbers**`<A,B>`
 *
 * Compares two numbers -- `A` and `B` -- and reports back
 * the numeric relationship `A` _has to_ `B`.
 *
 * - should handle _positive_ and _negative_ numbers
 * - should handle both _integer_ values and _decimal_ numbers
 *
 * Values are:
 *
 * - `equal`
 * - `greater`
 * - `less`
 *
 * ```ts
 * // "greater"
 * CompareNumbers<5,4>
 * ```
 */
export type CompareNumbers<
    A extends NumberLike,
    B extends NumberLike
> = A extends `${number}`
    ? CompareNumbers<AsNumber<A>, AsNumber<B>>
    : B extends `${number}`
        ? CompareNumbers<AsNumber<A>, AsNumber<B>>

        : number extends A
            ? "equal" | "greater" | "less"
            : number extends B
                ? "equal" | "greater" | "less"
                : A extends B
                    ? "equal"
                    : `${A}` extends `${B}`
                        ? "equal"
                        // Fast path for common small numbers (0-10)
                        : `${A}` extends keyof SimpleCompareMap
                            ? `${B}` extends keyof SimpleCompareMap[`${A}`]
                                ? SimpleCompareMap[`${A}`][`${B}`]
                                : ComplexCompare<A, B>
                            : ComplexCompare<A, B>;

// Fallback to complex comparison for cases not covered by the lookup table
type ComplexCompare<A extends NumberLike, B extends NumberLike>
// Handle negative numbers
                        = `${A}` extends `-${string}`
                            ? `${B}` extends `-${string}`
                            // Both negative - compare absolute values in reverse
                                ? CompareNegative<`${A}`, `${B}`>
                            // A negative, B positive
                                : "less"
                            : `${B}` extends `-${string}`
                            // A positive, B negative
                                ? "greater"
                            // Both positive
                                : ComparePositive<`${A}`, `${B}`>;

// For negative numbers, we reverse the comparison
type CompareNegative<A extends string, B extends string>
    = A extends `-${infer A_abs}`
        ? B extends `-${infer B_abs}`
            ? ComparePositive<B_abs, A_abs> // reversed
            : never
        : never;

// For positive numbers
type ComparePositive<A extends string, B extends string>
    = A extends "0"
        ? B extends "0" ? "equal" : "less"
        : B extends "0"
            ? "greater"
            : ManualCompare<A, B>;

// Manual comparison
type ManualCompare<A extends string, B extends string>
    // Check decimal vs integer
    = A extends `${string}.${string}`
        ? B extends `${string}.${string}`
            ? CompareDecimals<A, B>
            : CompareDecimalToInteger<A, B>
        : B extends `${string}.${string}`
            ? CompareIntegerToDecimal<A, B>
            : CompareIntegers<A, B>;

// Compare two decimal numbers
type CompareDecimals<A extends string, B extends string>
    = A extends `${infer A_int}.${infer A_dec}`
        ? B extends `${infer B_int}.${infer B_dec}`
            ? A_int extends B_int
                // Integer parts equal, compare decimal parts
                ? CompareDecimalParts<A_dec, B_dec>
                // Compare integer parts
                : CompareIntegers<A_int, B_int>
            : never
        : never;

type CompareDecimalToInteger<A extends string, B extends string>
    = A extends `${infer A_int}.${infer A_dec}`
        ? A_int extends B
            ? A_dec extends "0" | "00" | "000" | "0000" | "00000"
                ? "equal"
                : "greater"
            : CompareIntegers<A_int, B>
        : never;

type CompareIntegerToDecimal<A extends string, B extends string>
    = B extends `${infer B_int}.${infer B_dec}`
        ? A extends B_int
            ? B_dec extends "0" | "00" | "000" | "0000" | "00000"
                ? "equal"
                : "less"
            : CompareIntegers<A, B_int>
        : never;

// Compare decimal parts (when integer parts are equal)
type CompareDecimalParts<A extends string, B extends string>
    = A extends B
        ? "equal"
        : A extends `${infer A_first}${infer A_rest}`
            ? B extends `${infer B_first}${infer B_rest}`
                ? A_first extends B_first
                    ? CompareDecimalParts<A_rest, B_rest>
                    : CompareDigit<A_first, B_first>
                // B is shorter, pad with zeros
                : A extends `${string}${string}${string}${string}${string}${string}`
                    ? "greater" // A is much longer
                    : CompareDecimalParts<A, `${B}0`>
            // A is shorter, pad with zeros
            : B extends `${string}${string}${string}${string}${string}${string}`
                ? "less" // B is much longer
                : CompareDecimalParts<`${A}0`, B>;

// Compare single digits
type CompareDigit<A extends string, B extends string>
    = A extends "0" ? B extends "0" ? "equal" : "less"
        : A extends "1" ? B extends "0" ? "greater" : B extends "1" ? "equal" : "less"
            : A extends "2" ? B extends "0" | "1" ? "greater" : B extends "2" ? "equal" : "less"
                : A extends "3" ? B extends "0" | "1" | "2" ? "greater" : B extends "3" ? "equal" : "less"
                    : A extends "4" ? B extends "0" | "1" | "2" | "3" ? "greater" : B extends "4" ? "equal" : "less"
                        : A extends "5" ? B extends "0" | "1" | "2" | "3" | "4" ? "greater" : B extends "5" ? "equal" : "less"
                            : A extends "6" ? B extends "0" | "1" | "2" | "3" | "4" | "5" ? "greater" : B extends "6" ? "equal" : "less"
                                : A extends "7" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" ? "greater" : B extends "7" ? "equal" : "less"
                                    : A extends "8" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" ? "greater" : B extends "8" ? "equal" : "less"
                                        : A extends "9" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" ? "greater" : "equal"
                                            : never;

// Simple integer comparison with length patterns
type CompareIntegers<A extends string, B extends string>
    = A extends B
        ? "equal"
        : LengthBasedCompare<A, B>;

type LengthBasedCompare<A extends string, B extends string>
    = GetStringLength<A> extends GetStringLength<B>
        ? CompareSameLength<A, B>
        : GetStringLength<A> extends infer LA
            ? GetStringLength<B> extends infer LB
                ? LA extends number
                    ? LB extends number
                        ? SimpleNumberCompare<LA, LB>
                        : never
                    : never
                : never
            : never;

type GetStringLength<T extends string>
    = T extends `${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}` ? 10
        : T extends `${any}${any}${any}${any}${any}${any}${any}${any}${any}` ? 9
            : T extends `${any}${any}${any}${any}${any}${any}${any}${any}` ? 8
                : T extends `${any}${any}${any}${any}${any}${any}${any}` ? 7
                    : T extends `${any}${any}${any}${any}${any}${any}` ? 6
                        : T extends `${any}${any}${any}${any}${any}` ? 5
                            : T extends `${any}${any}${any}${any}` ? 4
                                : T extends `${any}${any}${any}` ? 3
                                    : T extends `${any}${any}` ? 2
                                        : 1;

// Simple comparison of single digit numbers
type SimpleNumberCompare<A, B>
    = A extends 1 ? B extends 1 ? "equal" : "less"
        : A extends 2 ? B extends 1 ? "greater" : B extends 2 ? "equal" : "less"
            : A extends 3 ? B extends 1 | 2 ? "greater" : B extends 3 ? "equal" : "less"
                : A extends 4 ? B extends 1 | 2 | 3 ? "greater" : B extends 4 ? "equal" : "less"
                    : A extends 5 ? B extends 1 | 2 | 3 | 4 ? "greater" : B extends 5 ? "equal" : "less"
                        : A extends 6 ? B extends 1 | 2 | 3 | 4 | 5 ? "greater" : B extends 6 ? "equal" : "less"
                            : A extends 7 ? B extends 1 | 2 | 3 | 4 | 5 | 6 ? "greater" : B extends 7 ? "equal" : "less"
                                : A extends 8 ? B extends 1 | 2 | 3 | 4 | 5 | 6 | 7 ? "greater" : B extends 8 ? "equal" : "less"
                                    : A extends 9 ? B extends 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 ? "greater" : B extends 9 ? "equal" : "less"
                                        : A extends 10 ? B extends 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 ? "greater" : B extends 10 ? "equal" : "less"
                                            : "equal";

// Compare strings of same length
type CompareSameLength<A extends string, B extends string>
    = A extends `${infer A_first}${infer A_rest}`
        ? B extends `${infer B_first}${infer B_rest}`
            ? A_first extends B_first
                ? CompareSameLength<A_rest, B_rest>
                : CompareDigit<A_first, B_first>
            : never
        : "equal";
