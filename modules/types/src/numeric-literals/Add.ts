import type {
    Abs,
    And,
    As,
    AsNumber,
    If,
    IsNegativeNumber,
    IsString,
    IsWideType,
    NumberLike,
    NumericChar,
    Or,
} from "inferred-types/types";

type Either<left extends boolean, right extends boolean>
    = left extends true ? true : right extends true ? true : false;

type DecrementDigit<digit extends NumericChar>
    = digit extends "1" ? "0"
        : digit extends "2" ? "1"
            : digit extends "3" ? "2"
                : digit extends "4" ? "3"
                    : digit extends "5" ? "4"
                        : digit extends "6" ? "5"
                            : digit extends "7" ? "6"
                                : digit extends "8" ? "7"
                                    : digit extends "9" ? "8"
                                        : digit extends "10" ? "9"
                                            : never;

type IncrementDigit<digit extends NumericChar>
    = digit extends "0" ? { result: "1"; carry: false }
        : digit extends "1" ? { result: "2"; carry: false }
            : digit extends "2" ? { result: "3"; carry: false }
                : digit extends "3" ? { result: "4"; carry: false }
                    : digit extends "4" ? { result: "5"; carry: false }
                        : digit extends "5" ? { result: "6"; carry: false }
                            : digit extends "6" ? { result: "7"; carry: false }
                                : digit extends "7" ? { result: "8"; carry: false }
                                    : digit extends "8" ? { result: "9"; carry: false }
                                        : digit extends "9" ? { result: "0"; carry: true }
                                            : never;

interface SingleDigitSumResult<
    result extends NumericChar,
    carry extends boolean,
> { result: result; carry: carry }

type SumSingleDigits<
    left extends NumericChar,
    right extends NumericChar,
    carryIn extends boolean = false,
    carryOut extends boolean = false,
> = carryIn extends true
    ? IncrementDigit<left> extends SingleDigitSumResult<infer leftIncremented, infer carryOutFromIncrement>
        ? SumSingleDigits<leftIncremented, right, false, carryOutFromIncrement>
        : never
    : right extends "0"
        ? { result: left; carry: carryOut }
        : IncrementDigit<left> extends SingleDigitSumResult<infer leftIncremented, infer carryOutFromIncrement>
            ? SumSingleDigits<leftIncremented, DecrementDigit<right>, false, Either<carryOut, carryOutFromIncrement>>
            : never;

interface RightMostDigitResult<rest extends string, digit extends NumericChar> { rest: rest; digit: digit }

type RightMostDigit<s extends string>
    = s extends `${infer rest}${NumericChar}`
        ? s extends `${rest}${infer digit}`
            ? { rest: rest; digit: digit }
            : never
        : never;

type SumStrings<
    left extends string,
    right extends string,
    accumulatedResultDigits extends string = "",
    carry extends boolean = false,
>
    = "" extends left
    // Left is empty
        ? "" extends right
        // Right is empty
            ? carry extends true ? `1${accumulatedResultDigits}` : accumulatedResultDigits
        // Right has value
            : RightMostDigit<right> extends RightMostDigitResult<infer remainingRight, infer rightDigit>
                ? SumSingleDigits<"0", rightDigit, carry> extends SingleDigitSumResult<infer resultDigit, infer resultCarry>
                    ? SumStrings<"", remainingRight, `${resultDigit}${accumulatedResultDigits}`, resultCarry>
                    : never
                : never
    // Left has value
        : "" extends right
        // Right has no value
            ? RightMostDigit<left> extends RightMostDigitResult<infer remainingLeft, infer leftDigit>
                ? SumSingleDigits<"0", leftDigit, carry> extends SingleDigitSumResult<infer resultDigit, infer resultCarry>
                    ? SumStrings<remainingLeft, "", `${resultDigit}${accumulatedResultDigits}`, resultCarry>
                    : never
                : never
        // Right has value
            : RightMostDigit<left> extends RightMostDigitResult<infer remainingLeft, infer leftDigit>
                ? RightMostDigit<right> extends RightMostDigitResult<infer remainingRight, infer rightDigit>
                    ? SumSingleDigits<leftDigit, rightDigit, carry> extends SingleDigitSumResult<infer resultDigit, infer resultCarry>
                        ? SumStrings<remainingLeft, remainingRight, `${resultDigit}${accumulatedResultDigits}`, resultCarry>
                        : never
                    : never
                : never;

type Process<
    A extends `${number}`,
    B extends `${number}`,
>
    // Both operands are negative: sum their absolutes, then apply negative sign
    = And<[ IsNegativeNumber<A>, IsNegativeNumber<B> ]> extends true
        ? `-${SumStrings<Abs<A>, Abs<B>>}`
    // Mixed signs: would require subtraction, return wide type to avoid circular dependency
        : Or<[IsNegativeNumber<A>, IsNegativeNumber<B>]> extends true
            ? `${number}`
        // Both positive: use digit-wise addition
            : SumStrings<A, B>;

type CheckWide<
    A extends NumberLike,
    B extends NumberLike,
> = IsWideType<A> extends true
    ? true
    : IsWideType<B> extends true
        ? true
        : false;

type PreProcess<
    A extends NumberLike,
    B extends NumberLike,
> = CheckWide<A, B> extends true
    ? Or<[IsString<A>, IsString<A>]> extends true
        ? string
        : number
    : Or<[IsWideType<A>, IsWideType<B>]> extends true
    // wide types found
        ? If<IsString<A>, string, number>
    // both are literals - check for mixed signs to avoid complexity
        : And<[IsNegativeNumber<A>, IsNegativeNumber<B>]> extends true
            // Both negative - safe to process
            ? A extends `${number}`
                ? B extends `${number}`
                    ? As<Process<A, B>, `${number}`>
                    : As<Process<A, `${As<B, number>}`>, `${number}`>
                : A extends number
                    ? B extends number
                        ? AsNumber<Process<`${A}`, `${B}`>>
                        : AsNumber<Process<`${A}`, As<B, `${number}`>>>
                    : never
            : Or<[IsNegativeNumber<A>, IsNegativeNumber<B>]> extends true
            // One is negative, one is positive - return wide type to avoid complexity
                ? A extends `${number}` ? `${number}` : number
            // Same signs or both positive - proceed normally
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
 * **Add**`<A,B>`
 *
 * Adds two `NumberLike` values together and returns the appropriate numeric type:
 *
 * - if either or both `A` and `B` are a `${number}` then a `${number}` type is returned
 * - if both are numeric values than the type is `number`.
 *
 * **Related:**
 * - `AddPositive` - a simpler utility that only handles positive numbers
 */
export type Add<
    A extends NumberLike,
    B extends NumberLike,
> = A extends number
    ? As<PreProcess<A, B>, number>
    : A extends `${number}`
        ? As<PreProcess<A, B>, `${number}`>
        : never;
