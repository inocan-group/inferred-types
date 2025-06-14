import {
    DateLike,
    And,
    IsIsoYear,
    As,
    IsIsoDate,
    Or,
    IsIso8601DateTime,
    StringSort,
    IsEqual,
    IsWideType
} from "inferred-types/types";


/**
 * **IsAfter**`<A,B>`
 *
 * Tests whether `A` is _after_ (in time) `B`.
 */
export type IsBefore<
    A extends DateLike,
    B extends DateLike,
> = IsWideType<A> extends true
? boolean
: IsWideType<B> extends true
? boolean
: [Or<[
        And<[IsIsoYear<A>, IsIsoYear<B>]>,
        And<[IsIsoDate<A>, IsIsoDate<B>]>,
        And<[IsIso8601DateTime<A>, IsIso8601DateTime<B>]>,
]>] extends [true]
    ? IsEqual<A, B> extends true
        ? false
        : IsEqual<
            StringSort<[
                As<A, string>,
                As<B, string>
            ]>,
            [A,B]
        >
    : boolean;

