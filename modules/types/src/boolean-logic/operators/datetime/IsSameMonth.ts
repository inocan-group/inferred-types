import type {
    Abs,
    And,
    As,
    AsDateMeta,
    DateLike,
    DateMeta,
    Delta,
    Err,
    IsEpochInMilliseconds,
    IsEpochInSeconds,
    IsEqual,
    IsGreaterThan,
    IsInteger,
    IsNotEqual,
    IsNumber,
    IsNumericLiteral,
    IsString,
    Not,
    Or,
} from "inferred-types/types";


/**
 * **IsSameMonth**`<A,B>`
 *
 * Boolean operator which indicates whether `A` and `B` represent
 * the same month. A literal true/false is returned where that is
 * possible other wise you'll just `boolean` for things which
 * can only be validated at runtime.
 *
 * **Note:** literal types are available at design time when:
 * - ISO Date/DateTime string are used
 * - returns `true` when epoch timestamps are the same
 * - otherwise we fallback to `boolean` for valid `DateLike` types
 *
 * **Related:**
 * - `IsSameMonthYear`, `IsSameDay`, `IsSameYear`,
 * - `isSameMonthYear()`, `isSameDay()`, `IsSameMonth()`
 */
export type IsSameMonth<
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
        : AsDateMeta<A> extends Error
            ? Err<
                "invalid-date",
                `The string passed into the first parameter of IsSameMonth -- ${As<A,string>} -- is not a valid ISO date! ${AsDateMeta<A>["message"]}`,
                { a: A, b: B }
            >
            : AsDateMeta<B> extends Error
                ? Err<
                    "invalid-date",
                    `The string passed into the second parameter of IsSameMonth -- ${As<B,string>} -- is not a valid ISO date!`,
                    { a: A, b: B }
                >
        : AsDateMeta<A> extends DateMeta
            ? AsDateMeta<B> extends DateMeta
                ? And<[
                    IsEqual<AsDateMeta<A>["month"], AsDateMeta<B>["month"]>,
                    IsNotEqual<AsDateMeta<A>["month"], null>,
                ]>
            : never
        : never
    : And<[
        IsNumericLiteral<A>,IsNumericLiteral<B>,IsEqual<A,B>,IsInteger<A>
    ]> extends true
        ? true
        : Or<[
            And<[IsNumber<A>, Not<IsInteger<A>>]>,
            And<[IsNumber<B>, Not<IsInteger<B>>]>,
        ]> extends true
            ? Err<`invalid-date`, `The numeric values passed into IsSameMonth were not integers which makes them unable to be treated as a date!`, { a: A, b: B }>
            : boolean;

