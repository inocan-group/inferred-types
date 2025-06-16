import type {
    And,
    As,
    DateLike,
    Extends,
    IsEqual,
    IsStringLiteral,
    NotEqual,
    ParseDate,
    ParsedDate,
} from "inferred-types/types";

/**
 * **IsSameMonth**`<A,B>`
 *
 * Boolean operator which indicates whether `A` and `B` represent
 * the same month. A literal true/false is returned where that is
 * possible other wise you'll just `boolean` for things which
 * can only be validated at runtime.
 *
 * **Note:** there aren't that many cases where we can discern this
 * at _design time_.
 *
 * **Related:**
 * - `IsSameMonthYear`, `IsSameDay`, `IsSameYear`,
 * - `isSameMonthYear()`, `isSameDay()`, `isSameYear()`
 */
export type IsSameMonth<
    A extends DateLike,
    B extends DateLike
> = And<[IsStringLiteral<A>, IsStringLiteral<B>]> extends true
    ? And<[
        Extends<ParseDate<As<A, string>>, ParsedDate>,
        Extends<ParseDate<As<B, string>>, ParsedDate>,
    ]> extends true
        ? And<[
            IsEqual<
                As<ParseDate<As<A, string>>, ParsedDate>["1"],
                As<ParseDate<As<B, string>>, ParsedDate>["1"]
            >,
            NotEqual<
                As<ParseDate<As<A, string>>, ParsedDate>["1"],
                null
            >
        ]> extends true
            ? true
            : false
        : boolean

    : boolean;
