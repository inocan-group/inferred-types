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
> = string extends TVal
? boolean
: string extends TMin
? boolean
: string extends TMax
? boolean
: number extends TVal
? boolean
: number extends TMin
? boolean
: number extends TMax
? boolean
: IsGreaterThanOrEqual<TVal,TMin> extends true
    ? IsLessThanOrEqual<TVal,TMax> extends true
        ? true
        : false
: false;
