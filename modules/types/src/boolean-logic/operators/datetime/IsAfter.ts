import type {
    And,
    As,
    DateLike,
    IsEqual,
    IsIsoDate,
    IsIsoDateTime,
    IsIsoYear,
    IsWideType,
    Or,
    StringSort
} from "inferred-types/types";

/**
 * **IsAfter**`<A,B>`
 *
 * Tests whether `A` is _after_ (in time) `B`.
 */
export type IsAfter<
    A extends DateLike,
    B extends DateLike,
> = IsWideType<A> extends true
    ? boolean
    : IsWideType<B> extends true
        ? boolean
        : [Or<[
            And<[IsIsoYear<A>, IsIsoYear<B>]>,
            And<[IsIsoDate<A>, IsIsoDate<B>]>,
            And<[IsIsoDateTime<A>, IsIsoDateTime<B>]>,
        ]>] extends [true]
            ? IsEqual<A, B> extends true
                ? false
                : IsEqual<
                    StringSort<[
                        As<A, string>,
                        As<B, string>
                    ], "descending">,
                    [A, B]
                >
            : boolean;
