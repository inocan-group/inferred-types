import type {
    And,
    DateLike,
    IsEqual,
    IsInteger,
    IsIsoExplicitDate,
    IsIsoImplicitDate,
    IsIsoYear,
    IsNumber,
    IsNumericLiteral,
    IsStringLiteral
} from "inferred-types/types";

/**
 * **IsSameDay**`<A,B>`
 *
 * Boolean operator which indicates whether `A` and `B` represent
 * the same date. A literal true/false is returned where that is
 * possible other wise you'll just `boolean` for things which
 * can only be validated at runtime.
 */
export type IsSameDay<
    A extends DateLike,
    B extends DateLike
> = And<[IsNumber<A>, IsNumber<B>]> extends true
    ? And<[IsNumericLiteral<A>, IsNumericLiteral<B>]> extends true
        ? And<[IsInteger<A>, IsInteger<B>]> extends true
            ? IsEqual<A, B>
            : false
        : boolean

    : And<[IsStringLiteral<A>, IsStringLiteral<B>]> extends true
        ? And<[IsIsoExplicitDate<A>, IsIsoExplicitDate<B>]> extends true
            ? IsEqual<A, B>
            : And<[IsIsoImplicitDate<A>, IsIsoImplicitDate<B>]> extends true
                ? IsEqual<A, B>
                : And<[IsIsoYear<A>, IsIsoYear<B>]> extends true
                    ? IsEqual<A, B>
                    : boolean
        : boolean;
