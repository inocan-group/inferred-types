import type {
    Err,
    IsDayJs,
    IsEqual,
    IsFloat,
    IsIsoFullDate,
    IsJsDate,
    IsLuxonDateTime,
    IsMoment,
    IsNegativeNumber,
} from "inferred-types/types";

type IsWide<A, B> = string extends A
    ? true
    : string extends B
        ? true
        : number extends A
            ? true
            : number extends B
                ? true
                : false;

type BothNumeric<A, B> = A extends number
    ? B extends number
        ? true
        : false
    : false;

type BothStrings<A, B> = A extends string
    ? B extends string
        ? true
        : false
    : false;

type EitherAreDateObject<A, B> = IsJsDate<A> extends true
    ? true
    : IsJsDate<B> extends true
        ? true
        : IsMoment<A> extends true
            ? true
            : IsMoment<B> extends true
                ? true
                : IsDayJs<A> extends true
                    ? true
                    : IsDayJs<B> extends true
                        ? true
                        : IsLuxonDateTime<A> extends true
                            ? true
                            : IsLuxonDateTime<B> extends true
                                ? true
                                : false;

type GetDatePart<T> = T extends `${infer D}T${string}` ? D : T;

// Lightweight check: Just verifies it looks like YYYY-MM-DD or YYYYMMDD using generic ${number}
// This avoids the combinatorial explosion of 10^N union types from matching specific digits.
type IsLikelyDate<T extends string>
    = T extends `${number}-${number}-${number}` ? true
        : T extends `${number}${number}${number}${number}${number}${number}${number}${number}` ? true
            : false;

// Efficiently check for 4-digit numeric string without generating large unions
type IsFourDigitYearString<T extends string>
    = T extends `${number}`
        ? T extends `${infer _1}${infer _2}${infer _3}${infer _4}${infer Rest}`
            ? Rest extends "" ? true : false
            : false
        : false;

/**
 * **IsSameDay**`<A,B>`
 *
 * Boolean operator which indicates whether `A` and `B` represent
 * the same calendar day.
 */
export type IsSameDay<
    A,
    B
> = IsWide<A, B> extends true
    ? boolean
    : BothNumeric<A, B> extends true
        ? IsFloat<A> extends true
            ? Err<`invalid-date/float`>
            : IsFloat<B> extends true
                ? Err<`invalid-date/float`>
                : IsNegativeNumber<A> extends true
                    ? Err<`invalid-date/negative`>
                    : IsNegativeNumber<B> extends true
                        ? Err<`invalid-date/negative`>
                        : IsEqual<A, B> extends true
                            ? true
                            : boolean
        : BothStrings<A, B> extends true
            // Fast path for identical strings
            ? IsEqual<GetDatePart<A>, GetDatePart<B>> extends true
                // If they are equal strings, check if valid ISO date
                ? IsIsoFullDate<GetDatePart<A>> extends true
                    ? true
                    : Err<`invalid-date`>
                // If not equal
                : IsLikelyDate<GetDatePart<A>> extends true
                    ? IsLikelyDate<GetDatePart<B>> extends true
                        ? false // Both look like dates, but are different -> false
                        : IsFourDigitYearString<B> extends true
                            ? false
                            : Err<`invalid-date`>
                    : IsFourDigitYearString<A> extends true
                        ? IsFourDigitYearString<B> extends true
                            ? IsEqual<A, B> extends true ? true : false
                            : Err<`invalid-date`>
                        : Err<`invalid-date`>
            : EitherAreDateObject<A, B> extends true
                ? boolean
                : Err<`invalid-date`>;
