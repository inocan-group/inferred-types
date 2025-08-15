import type {
    Abs,
    AddPositive,
    And,
    As,
    AsNumber,
    CompareNumbers,
    IsNegativeNumber,
    IsString,
    IsWideType,
    NumberLike,
    NumericChar,
    Or,
} from "inferred-types/types";

type DecrementDigit<digit extends NumericChar> = digit extends "0" ? "9"
    : digit extends "1" ? "0"
        : digit extends "2" ? "1"
            : digit extends "3" ? "2"
                : digit extends "4" ? "3"
                    : digit extends "5" ? "4"
                        : digit extends "6" ? "5"
                            : digit extends "7" ? "6"
                                : digit extends "8" ? "7"
                                    : digit extends "9" ? "8"
                                        : never;

// Result of subtracting a single digit
interface SingleDigitSubResult<
    result extends NumericChar,
    borrow extends boolean,
> { result: result; borrow: borrow }

// Subtract single digits with borrowing
type SubtractSingleDigits<
    left extends NumericChar,
    right extends NumericChar,
    borrowIn extends boolean = false,
> = borrowIn extends true
    ? left extends "0"
        // When we borrow from 0, it becomes 9, but we still need to propagate the borrow
        ? SubtractSingleDigitsNoBorrow<"9", right> extends SingleDigitSubResult<infer R, infer _B>
            ? { result: R; borrow: true } // Always propagate borrow when borrowing from 0
            : never
        // When we borrow from non-zero, decrement and proceed
        : SubtractSingleDigits<DecrementDigit<left>, right, false>
    : right extends "0"
        ? { result: left; borrow: false }
        : CompareDigit<left, right> extends "less"
            ? SubtractWithBorrow<left, right>
            : SubtractNoBorrow<left, right>;

// Helper for subtraction without initial borrow
type SubtractSingleDigitsNoBorrow<
    left extends NumericChar,
    right extends NumericChar,
> = right extends "0"
    ? { result: left; borrow: false }
    : CompareDigit<left, right> extends "less"
        ? SubtractWithBorrow<left, right>
        : SubtractNoBorrow<left, right>;

// Helper to compare single digits
type CompareDigit<A extends NumericChar, B extends NumericChar>
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

// Subtract when borrowing is needed (left < right)
type SubtractWithBorrow<
    left extends NumericChar,
    right extends NumericChar,
> // Add 10 to left, then subtract right
    = left extends "0"
        ? right extends "1" ? { result: "9"; borrow: true }
            : right extends "2" ? { result: "8"; borrow: true }
                : right extends "3" ? { result: "7"; borrow: true }
                    : right extends "4" ? { result: "6"; borrow: true }
                        : right extends "5" ? { result: "5"; borrow: true }
                            : right extends "6" ? { result: "4"; borrow: true }
                                : right extends "7" ? { result: "3"; borrow: true }
                                    : right extends "8" ? { result: "2"; borrow: true }
                                        : right extends "9" ? { result: "1"; borrow: true }
                                            : never
        : left extends "1"
            ? right extends "2" ? { result: "9"; borrow: true }
                : right extends "3" ? { result: "8"; borrow: true }
                    : right extends "4" ? { result: "7"; borrow: true }
                        : right extends "5" ? { result: "6"; borrow: true }
                            : right extends "6" ? { result: "5"; borrow: true }
                                : right extends "7" ? { result: "4"; borrow: true }
                                    : right extends "8" ? { result: "3"; borrow: true }
                                        : right extends "9" ? { result: "2"; borrow: true }
                                            : never
            : left extends "2"
                ? right extends "3" ? { result: "9"; borrow: true }
                    : right extends "4" ? { result: "8"; borrow: true }
                        : right extends "5" ? { result: "7"; borrow: true }
                            : right extends "6" ? { result: "6"; borrow: true }
                                : right extends "7" ? { result: "5"; borrow: true }
                                    : right extends "8" ? { result: "4"; borrow: true }
                                        : right extends "9" ? { result: "3"; borrow: true }
                                            : never
                : left extends "3"
                    ? right extends "4" ? { result: "9"; borrow: true }
                        : right extends "5" ? { result: "8"; borrow: true }
                            : right extends "6" ? { result: "7"; borrow: true }
                                : right extends "7" ? { result: "6"; borrow: true }
                                    : right extends "8" ? { result: "5"; borrow: true }
                                        : right extends "9" ? { result: "4"; borrow: true }
                                            : never
                    : left extends "4"
                        ? right extends "5" ? { result: "9"; borrow: true }
                            : right extends "6" ? { result: "8"; borrow: true }
                                : right extends "7" ? { result: "7"; borrow: true }
                                    : right extends "8" ? { result: "6"; borrow: true }
                                        : right extends "9" ? { result: "5"; borrow: true }
                                            : never
                        : left extends "5"
                            ? right extends "6" ? { result: "9"; borrow: true }
                                : right extends "7" ? { result: "8"; borrow: true }
                                    : right extends "8" ? { result: "7"; borrow: true }
                                        : right extends "9" ? { result: "6"; borrow: true }
                                            : never
                            : left extends "6"
                                ? right extends "7" ? { result: "9"; borrow: true }
                                    : right extends "8" ? { result: "8"; borrow: true }
                                        : right extends "9" ? { result: "7"; borrow: true }
                                            : never
                                : left extends "7"
                                    ? right extends "8" ? { result: "9"; borrow: true }
                                        : right extends "9" ? { result: "8"; borrow: true }
                                            : never
                                    : left extends "8"
                                        ? right extends "9" ? { result: "9"; borrow: true }
                                            : never
                                        : never;

// Subtract when no borrowing is needed
type SubtractNoBorrow<
    left extends NumericChar,
    right extends NumericChar,
> = right extends "0" ? { result: left; borrow: false }
    : left extends "1"
        ? right extends "1" ? { result: "0"; borrow: false } : never
        : left extends "2"
            ? right extends "1" ? { result: "1"; borrow: false }
                : right extends "2" ? { result: "0"; borrow: false } : never
            : left extends "3"
                ? right extends "1" ? { result: "2"; borrow: false }
                    : right extends "2" ? { result: "1"; borrow: false }
                        : right extends "3" ? { result: "0"; borrow: false } : never
                : left extends "4"
                    ? right extends "1" ? { result: "3"; borrow: false }
                        : right extends "2" ? { result: "2"; borrow: false }
                            : right extends "3" ? { result: "1"; borrow: false }
                                : right extends "4" ? { result: "0"; borrow: false } : never
                    : left extends "5"
                        ? right extends "1" ? { result: "4"; borrow: false }
                            : right extends "2" ? { result: "3"; borrow: false }
                                : right extends "3" ? { result: "2"; borrow: false }
                                    : right extends "4" ? { result: "1"; borrow: false }
                                        : right extends "5" ? { result: "0"; borrow: false } : never
                        : left extends "6"
                            ? right extends "1" ? { result: "5"; borrow: false }
                                : right extends "2" ? { result: "4"; borrow: false }
                                    : right extends "3" ? { result: "3"; borrow: false }
                                        : right extends "4" ? { result: "2"; borrow: false }
                                            : right extends "5" ? { result: "1"; borrow: false }
                                                : right extends "6" ? { result: "0"; borrow: false } : never
                            : left extends "7"
                                ? right extends "1" ? { result: "6"; borrow: false }
                                    : right extends "2" ? { result: "5"; borrow: false }
                                        : right extends "3" ? { result: "4"; borrow: false }
                                            : right extends "4" ? { result: "3"; borrow: false }
                                                : right extends "5" ? { result: "2"; borrow: false }
                                                    : right extends "6" ? { result: "1"; borrow: false }
                                                        : right extends "7" ? { result: "0"; borrow: false } : never
                                : left extends "8"
                                    ? right extends "1" ? { result: "7"; borrow: false }
                                        : right extends "2" ? { result: "6"; borrow: false }
                                            : right extends "3" ? { result: "5"; borrow: false }
                                                : right extends "4" ? { result: "4"; borrow: false }
                                                    : right extends "5" ? { result: "3"; borrow: false }
                                                        : right extends "6" ? { result: "2"; borrow: false }
                                                            : right extends "7" ? { result: "1"; borrow: false }
                                                                : right extends "8" ? { result: "0"; borrow: false } : never
                                    : left extends "9"
                                        ? right extends "1" ? { result: "8"; borrow: false }
                                            : right extends "2" ? { result: "7"; borrow: false }
                                                : right extends "3" ? { result: "6"; borrow: false }
                                                    : right extends "4" ? { result: "5"; borrow: false }
                                                        : right extends "5" ? { result: "4"; borrow: false }
                                                            : right extends "6" ? { result: "3"; borrow: false }
                                                                : right extends "7" ? { result: "2"; borrow: false }
                                                                    : right extends "8" ? { result: "1"; borrow: false }
                                                                        : right extends "9" ? { result: "0"; borrow: false } : never
                                        : never;

// Extract rightmost digit from a string
type RightMostDigit<s extends string>
  = s extends `${infer rest}${NumericChar}`
      ? s extends `${rest}${infer digit}`
          ? { rest: rest; digit: digit }
          : never
      : never;

// Subtract two strings digit by digit
type SubtractStrings<
    left extends string,
    right extends string,
    accumulatedResultDigits extends string = "",
    borrow extends boolean = false,
>
  = "" extends left
      ? "" extends right
          ? borrow extends true
              ? never // Should not happen if we check magnitude first
              : RemoveLeadingZeros<accumulatedResultDigits>
          : never // right should not be longer than left
      : "" extends right
          ? RightMostDigit<left> extends { rest: infer remainingLeft; digit: infer leftDigit }
              ? leftDigit extends NumericChar
                  ? SubtractSingleDigits<leftDigit, "0", borrow> extends SingleDigitSubResult<infer resultDigit, infer resultBorrow>
                      ? SubtractStrings<remainingLeft & string, "", `${resultDigit}${accumulatedResultDigits}`, resultBorrow>
                      : never
                  : never
              : never
          : RightMostDigit<left> extends { rest: infer remainingLeft; digit: infer leftDigit }
              ? RightMostDigit<right> extends { rest: infer remainingRight; digit: infer rightDigit }
                  ? leftDigit extends NumericChar
                      ? rightDigit extends NumericChar
                          ? SubtractSingleDigits<leftDigit, rightDigit, borrow> extends SingleDigitSubResult<infer resultDigit, infer resultBorrow>
                              ? SubtractStrings<remainingLeft & string, remainingRight & string, `${resultDigit}${accumulatedResultDigits}`, resultBorrow>
                              : never
                          : never
                      : never
                  : never
              : never;

// Remove leading zeros from result
type RemoveLeadingZeros<s extends string>
    = s extends "0" ? "0"
        : s extends `0${infer rest}`
            ? RemoveLeadingZeros<rest>
            : s extends "" ? "0" : s;

// Main processing logic
type Process<
    A extends `${number}`,
    B extends `${number}`,
>
    // Both operands are negative: -A - (-B) = -A + B = B - A
    = And<[IsNegativeNumber<A>, IsNegativeNumber<B>]> extends true
        ? CompareNumbers<Abs<A>, Abs<B>> extends "less"
            // |A| < |B|, so B - A is positive
            ? SubtractStrings<Abs<B>, Abs<A>>
            // |A| >= |B|, so B - A is negative or zero
            : SubtractStrings<Abs<A>, Abs<B>> extends infer Result
                ? Result extends string
                    ? Result extends "0" ? "0" : `-${Result}`
                    : `${number}`
                : `${number}`
        // A is negative, B is positive: -(|A| + |B|)
        : IsNegativeNumber<A> extends true
            ? AddPositive<Abs<A>, Abs<B>> extends infer Sum
                ? Sum extends number | `${number}`
                    ? `-${Sum}`
                    : `${number}`
                : `${number}`
            // A is positive, B is negative: A + |B|
            : IsNegativeNumber<B> extends true
                ? AddPositive<A, Abs<B>>
                // Both positive: check which is larger
                : CompareNumbers<A, B> extends "less"
                    ? SubtractStrings<B, A> extends infer Result
                        ? Result extends string
                            ? `-${Result}`
                            : `${number}`
                        : `${number}`
                    : SubtractStrings<A, B>;

// Check for wide types
type CheckWide<
    A extends NumberLike,
    B extends NumberLike,
> = IsWideType<A> extends true
    ? true
    : IsWideType<B> extends true
        ? true
        : false;

// Preprocessing to handle type conversion and wide types
type PreProcess<
    A extends NumberLike,
    B extends NumberLike,
> = CheckWide<A, B> extends true
    ? Or<[IsString<A>, IsString<B>]> extends true
        ? `${number}`
        : number
    : A extends `${number}`
        ? B extends `${number}`
            ? As<Process<A, B>, `${number}`>
            : As<Process<A, `${As<B, number>}`>, `${number}`>
        : A extends number
            ? B extends number
                ? AsNumber<Process<`${A}`, `${B}`>>
                : AsNumber<Process<`${A}`, As<B, `${number}`>>>
            : never;

/**
 * **Subtract**`<A,B>`
 *
 * Subtracts the value of `B` _from_ `A`.
 *
 * Returns literal types when possible, handling both positive and negative results.
 * For mixed sign operations that would require addition, returns wide types.
 */
export type Subtract<
    A extends NumberLike,
    B extends NumberLike,
> = A extends number
    ? As<PreProcess<A, B>, number>
    : A extends `${number}`
        ? As<PreProcess<A, B>, `${number}`>
        : never;
