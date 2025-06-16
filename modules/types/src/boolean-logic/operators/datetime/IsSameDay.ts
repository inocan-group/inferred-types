import type {
    And,
    As,
    DateLike,
    Extends,
    IsEqual,
    IsInteger,
    IsNumber,
    IsString,
    IsWideType,
    ParseDate,
    ParsedDate
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
> = IsWideType<A> extends true
    ? boolean
    : IsWideType<B> extends true
        ? boolean

        : And<[
            IsString<A>,
            IsString<B>,
        ]> extends true
            ? And<[
                Extends<ParseDate<As<A, string>>, ParsedDate>,
                Extends<ParseDate<As<B, string>>, ParsedDate>,
            ]> extends true
                ? As<ParseDate<As<A, string>>, ParsedDate>["1"] extends
                As<ParseDate<As<B, string>>, ParsedDate>["1"]
                    ? true
                    : false
                : boolean
            : And<[
                IsNumber<A>,
                IsNumber<B>,
                IsEqual<A, B>
            ]> extends true
                ? And<[IsInteger<A>, IsInteger<B>]> extends true
                    ? true
                    : false
                : boolean;
