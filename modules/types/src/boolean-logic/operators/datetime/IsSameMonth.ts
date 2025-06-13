import type {
    And,
    As,
    DateLike,
    IsEqual,
    IsIsoExplicitDate,
    IsIsoImplicitDate,
    IsIsoYear,
    Iso8601Date,
    IsStringLiteral,
    Slice,
    Split,
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
    ? And<[IsIsoExplicitDate<A>, IsIsoExplicitDate<B>]> extends true
        ? IsEqual<
            Split<As<A, Iso8601Date<"explicit">>, "-">[1],
            Split<As<A, Iso8601Date<"explicit">>, "-">[1]
        >
        : And<[IsIsoImplicitDate<A>, IsIsoImplicitDate<B>]> extends true
            ? IsEqual<
                Slice<As<A, Iso8601Date<"implicit">>, 5, 2>,
                Slice<As<B, Iso8601Date<"implicit">>, 5, 2>
            >
            : And<[IsIsoYear<A>, IsIsoYear<B>]> extends true
                ? IsEqual<A, B>
                : boolean
    : boolean;
