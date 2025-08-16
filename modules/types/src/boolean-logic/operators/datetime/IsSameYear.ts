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
    IsFloat,
    IsGreaterThan,
    IsInteger,
    IsNegativeNumber,
    IsNotEqual,
    IsNull,
    IsNumber,
    IsNumericLiteral,
    IsString,
    Not,
    Or,
    Unbrand,
} from "inferred-types/types";

type MS_IN_YEAR = 31536000000;
type SEC_IN_YEAR = 31536000;

/**
 * **IsSameYear**`<A,B>`
 *
 * Boolean operator which indicates whether `A` and `B` represent
 * the same year. A literal true/false is returned where that is
 * possible other wise you'll just `boolean` for things which
 * can only be validated at runtime.
 *
 * **Note:** literal types are available at design time when:
 * - ISO Date/DateTime string are used
 * - returns `true` when epoch timestamps are the same
 * - returns `false` when epoch timestamps are more than a year
 * different
 * - otherwise we fallback to `boolean` for valid `DateLike` types
 *
 * **Related:**
 * - `IsSameMonthYear`, `IsSameDay`, `IsSameMonth`,
 * - `isSameMonthYear()`, `isSameYear()`, `isSameMonth()`
 */
export type IsSameYear<
    A extends DateLike,
    B extends DateLike
> = number extends A
? boolean
: number extends B
? boolean
: string extends A
? boolean
: string extends B
? boolean
: IsFloat<A> extends true
    ? Err<
        "invalid-date/float",
        `A in IsSameYear<A,B> was a floating point number!`,
        { A: A, B: B }
    >
: IsFloat<B> extends true
    ? Err<
        "invalid-date/float",
        `B in IsSameYear<A,B> was a floating point number!`,
        { A: A, B: B }
    >
: IsNegativeNumber<A> extends true
    ? Err<
        "invalid-date/negative",
        `A in IsSameYear<A,B> was a negative number!`,
        { A: A, B: B }
    >
: IsNegativeNumber<B> extends true
    ? Err<
        "invalid-date/negative",
        `B in IsSameYear<A,B> was a negative number!`,
        { A: A, B: B }
    >
: And<[IsNumber<A>,IsNumber<B>]> extends true

    ? IsEqual<A,B> extends true
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
                : boolean
: AsDateMeta<A> extends Error
    ? Err<
        "invalid-date",
                `The string passed into the first parameter of IsSameYear -- ${As<A, string>} -- is not a valid ISO date! ${AsDateMeta<A>["message"]}`,
                { a: A; b: B }
    >
: AsDateMeta<B> extends Error
    ? Err<
        "invalid-date",
                `The string passed into the second parameter of IsSameYear -- ${As<B, string>} -- is not a valid ISO date!`,
                { a: A; b: B }
    >
    : AsDateMeta<A> extends DateMeta
        ? AsDateMeta<B> extends DateMeta
            ? IsNull<AsDateMeta<A>["year"]> extends true
                ? false
            : AsDateMeta<A>["year"] extends AsDateMeta<B>["year"]
                ? true
                : false
        : boolean
    : boolean;
