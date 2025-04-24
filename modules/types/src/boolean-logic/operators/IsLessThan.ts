import type {
    AsNumber,
    CompareNumbers,
    IsWideType,
    LessThanOrEqual,
    NumberLike,
    Or
} from "inferred-types/types";

/**
 * **IsLessThan**`<A,B>`
 *
 * Boolean type operator which determines whether `A`
 * is _less than_ `B`.
 *
 * **Note:** does not take negative numbers into account
 */
export type IsLessThan<
    A extends NumberLike,
    B extends NumberLike,
> = Or<[ IsWideType<A>, IsWideType<B> ]> extends true
? boolean
: CompareNumbers<AsNumber<A>, AsNumber<B>> extends "less" ? true : false;

/**
 * **IsLessThanOrEqual**`<A,B>`
 *
 * Test whether `A` is _less than_ or _equal_ to `B`.
 */
export type IsLessThanOrEqual<
    A extends NumberLike,
    B extends NumberLike,
> = Or<[ IsWideType<A>, IsWideType<B> ]> extends true
? boolean
: LessThanOrEqual<AsNumber<A>, AsNumber<B>>;
