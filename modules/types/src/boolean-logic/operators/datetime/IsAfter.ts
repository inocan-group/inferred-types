import type {
    And,
    As,
    DateLike,
    Err,
    Extends,
    IsEqual,
    IsIsoDate,
    IsIsoDateTime,
    IsIsoYear,
    IsObject,
    IsWideNumber,
    IsWideString,
    Not,
    Or,
    StringIsAfter
} from "inferred-types/types";

/**
 * **IsAfter**`<A,B>`
 *
 * Tests whether `A` is _after_ (in time) `B`.
 */
export type IsAfter<
    A,
    B,
> = Or<[
    Not<Extends<A, DateLike>>,
    Not<Extends<B, DateLike>>,
]> extends true
    ? Err<
        `invalid-date/is-after`,
        `The IsAfter<A,B> utility expects both parameters to extend the DateLike type but at least one did not!`,
        { a: A; b: B }
    >
    : Or<[
        IsObject<A>,
        IsObject<B>,
        IsWideString<A>,
        IsWideString<B>,
        IsWideNumber<A>,
        IsWideNumber<B>
    ]> extends true
        ? boolean
        : [Or<[
            And<[IsIsoYear<A>, IsIsoYear<B>]>,
            And<[IsIsoDate<A>, IsIsoDate<B>]>,
            And<[IsIsoDateTime<A>, IsIsoDateTime<B>]>,
        ]>] extends [true]
            ? IsEqual<A, B> extends true
                ? false
                : StringIsAfter<
                    As<A, string>,
                    As<B, string>
                >

            : never;
