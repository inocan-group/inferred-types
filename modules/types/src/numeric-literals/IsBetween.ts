import type {
    And,
    IsGreaterThan,
    IsGreaterThanOrEqual,
    IsLessThan,
    IsLessThanOrEqual,
    IsWideType,
    NumberLike,
    Or
} from "inferred-types/types";

/**
 * **IsBetweenExclusively**`<TVal, TMin, TMax>`
 *
 * Boolean operator which determines whether `TVal` is
 *
 * - greater than `TMin`
 * - and less than `TMax`
 *
 * **Related:** `IsBetweenInclusively`
 */
export type IsBetweenExclusively<
    TVal extends NumberLike,
    TMin extends NumberLike,
    TMax extends NumberLike,
> = Or<[
    IsWideType<TVal>,
    IsWideType<TMin>,
    IsWideType<TMax>
]> extends true
    ? boolean
    : And<[
        IsGreaterThan<TVal, TMin>,
        IsLessThan<TVal, TMax>
    ]>;

/**
 * **IsBetweenInclusively**`<TVal, TMin, TMax>`
 *
 * Boolean operator which determines whether `TVal` is
 *
 * - greater than _or equal to_ `TMin`
 * - and less than _or equal to_ `TMax`
 *
 * **Related:** `IsBetweenExclusively`
 */
export type IsBetweenInclusively<
    TVal extends NumberLike,
    TMin extends NumberLike,
    TMax extends NumberLike,
> = Or<[
    IsWideType<TVal>,
    IsWideType<TMin>,
    IsWideType<TMax>
]> extends true
    ? boolean
    : // Avoid And combinator to prevent deep recursion in simple cases
    IsGreaterThanOrEqual<TVal, TMin> extends true
        ? IsLessThanOrEqual<TVal, TMax>
        : false;
