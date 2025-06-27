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
 * **IsSameYear**`<A,B>`
 *
 * Boolean operator which indicates whether `A` and `B` represent
 * the same year. A literal true/false is returned where that is
 * possible other wise you'll just `boolean` for things which
 * can only be validated at runtime.
 *
 * **Note:** there aren't that many cases where we can discern this
 * at _design time_.
 *
 * **Related:**
 * - `IsSameMonthYear`, `IsSameDay`, `IsSameMonth`,
 * - `isSameMonthYear()`, `isSameDay()`, `isSameMonth()`
 */
export type IsSameYear<
    A extends DateLike,
    B extends DateLike
> = And<[IsStringLiteral<A>, IsStringLiteral<B>]> extends true
    ? And<[
        Extends<ParseDate<As<A, string>>, ParsedDate>,
        Extends<ParseDate<As<B, string>>, ParsedDate>,
    ]> extends true
        ? And<[
            IsEqual<
                As<ParseDate<As<A, string>>, ParsedDate>["0"],
                As<ParseDate<As<B, string>>, ParsedDate>["0"]
            >,
            NotEqual<
                As<ParseDate<As<A, string>>, ParsedDate>["0"],
                null
            >
        ]> extends true
            ? true
            : false
        : boolean
    : boolean;
