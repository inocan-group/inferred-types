import type {
    Abs,
    And,
    As,
    AsDateMeta,
    CompareNumbers,
    DateLike,
    DateMeta,
    Delta,
    DeltaLight,
    Err,
    Extends,
    IsEpochInMilliseconds,
    IsEpochInSeconds,
    IsEqual,
    IsGreaterThan,
    IsInteger,
    IsNegativeNumber,
    IsNotEqual,
    IsNumber,
    IsNumericLiteral,
    IsString,
    Not,
    Or,
    Subtract,
} from "inferred-types/types";

type MS_IN_DAY = 86400000;
type SEC_IN_DAY = 86400;

/**
 * **IsSameDay**`<A,B>`
 *
 * Boolean operator which indicates whether `A` and `B` represent
 * the same calendar day.
 *
 * A literal true/false is returned where that is
 * possible other wise you'll just `boolean` for things which
 * can only be validated at runtime.
 *
 * Note:
 *
 * - literal values should be possible at _design time_ when ISO strings
 * are being used
 * - if both values are numeric we can return `false` when epoch based dates
 * aren't close enough to be on the same day.
 * - if an epoch timestamp is encountered and timestamps are identical then we
 * can return `true` at design time.
 * - if a `year-month` ISO string encountered, this utility will return a
 * a `InvalidDate` error because the date has no concept of a concrete calendar date.
 */
export type IsSameDay<
    A,
    B
> = Or<[
    And<[IsNumericLiteral<A>, Not<IsInteger<A>>]>,
    And<[IsNumericLiteral<B>, Not<IsInteger<B>>]>
]> extends true
? Err<
    `invalid-date/non-integer`,
    `The IsSameDay<A,B> utility was passed at least one non-integer number which is not allowed!`,
    { a: A, b: B }
>
: And<[
    IsNumericLiteral<A>,
    IsNumericLiteral<B>,
    IsEqual<A, B>,
    IsInteger<A>
]> extends true
    ? true

: Or<[
    Not<Extends<A, DateLike>>,
    Not<Extends<B, DateLike>>,
]> extends true
    ? Err<
        `invalid-date`,
        `The IsSameDay<A,B> type utility expects both A and B to be a DateLike value but at least one was not!`,
        { a: A; b: B }
    >
    : And<[
        IsString<A>,
        IsString<B>
    ]> extends true
        ? Or<[
            string extends A ? true : false,
            string extends B ? true : false,
        ]> extends true
            ? boolean
            : AsDateMeta<A> extends Error
                ? Err<
                    "invalid-date",
                    `The string passed into the first parameter of IsSameDay -- ${As<A, string>} -- is not a valid ISO date!`,
                    { a: A; b: B }
                >
                : AsDateMeta<B> extends Error
                    ? Err<
                        "invalid-date",
                    `The string passed into the second parameter of IsSameDay -- ${As<B, string>} -- is not a valid ISO date!`,
                    { a: A; b: B }
                    >
                    : AsDateMeta<A> extends DateMeta
                        ? AsDateMeta<B> extends DateMeta
                            ? And<[
                                IsEqual<AsDateMeta<A>["year"], AsDateMeta<B>["year"]>,
                                IsEqual<AsDateMeta<A>["month"], AsDateMeta<B>["month"]>,
                                IsEqual<AsDateMeta<A>["date"], AsDateMeta<B>["date"]>,
                                IsNotEqual<AsDateMeta<A>["date"], null>,
                                IsNotEqual<AsDateMeta<A>["year"], null>,
                            ]>
                            : never
                        : never


                        : boolean;
