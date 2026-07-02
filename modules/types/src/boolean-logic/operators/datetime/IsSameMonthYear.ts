import type {
    Abs,
    And,
    DateLike,
    Delta,
    Err,
    IsDayJs,
    IsEpochInMilliseconds,
    IsEpochInSeconds,
    IsEqual,
    IsGreaterThan,
    IsInteger,
    IsJsDate,
    IsLuxonDateTime,
    IsMoment,
    IsNumber,
    IsNumericLiteral,
    IsString,
    Not,
    Or
} from "inferred-types/types";

type MS_IN_YEAR = 31536000000;
type SEC_IN_YEAR = 31536000;

type GetDatePart<T> = T extends `${infer D}T${string}` ? D : T;

// Extracts YYYY-MM from date strings
type GetYearMonthFromDate<T extends string>
    = T extends `-${infer Rest}`
        ? GetYearMonthFromDate<Rest>
        : T extends `${infer Y}-${infer M}-${string}` ? `${Y}-${M}`
            : T extends `${infer Y}-${infer M}` ? `${Y}-${M}`
                : never;

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

/**
 * **IsSameMonthYear**`<A,B>`
 *
 * Boolean operator which indicates whether `A` and `B` represent
 * the same month and year.
 */
export type IsSameMonthYear<
    A extends DateLike,
    B extends DateLike
> = And<[
    IsString<A>,
    IsString<B>
]> extends true
    ? Or<[
        string extends A ? true : false,
        string extends B ? true : false,
    ]> extends true
        ? boolean
        : A extends string
            ? B extends string
                ? IsEqual<GetYearMonthFromDate<GetDatePart<A>>, GetYearMonthFromDate<GetDatePart<B>>> extends true
                    ? true
                    : false
                : never
            : never
    : And<[
        IsNumericLiteral<A>,
        IsNumericLiteral<B>,
        IsEqual<A, B>,
        IsInteger<A>
    ]> extends true
        ? true

        : And<[
            IsEpochInMilliseconds<A>,
            IsEpochInMilliseconds<B>,
            A extends number
                ? B extends number
                    ? Delta<A, B> extends infer D extends number
                        ? IsGreaterThan<Abs<D>, MS_IN_YEAR>
                        : false
                    : false
                : false
        ]> extends true
            ? false
            : And<[
                IsEpochInSeconds<A>,
                IsEpochInSeconds<B>,
                A extends number
                    ? B extends number
                        ? Delta<A, B> extends infer D extends number
                            ? IsGreaterThan<Abs<D>, SEC_IN_YEAR>
                            : false
                        : false
                    : false
            ]> extends true
                ? false
                : Or<[
                    And<[IsNumber<A>, Not<IsInteger<A>>]>,
                    And<[IsNumber<B>, Not<IsInteger<B>>]>,
                ]> extends true
                    ? Err<`invalid-date`, `The numeric values passed into IsSameMonth were not integers which makes them unable to be treated as a date!`, { a: A; b: B }>
                    : EitherAreDateObject<A, B> extends true ? boolean : boolean; // Fallback to boolean for runtime checks
