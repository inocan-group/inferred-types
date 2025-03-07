import type {
    AsNumber,
    CompareNumbers,
    IsEqual,
    NumberLike,
    Or
} from "inferred-types/types";

/**
 * **IsGreaterThan**`<A,B>`
 *
 * Boolean type operator which determines whether `A`
 * is _greater than_ `B`.
 *
 * **Note:** does not take negative numbers into account
 */
export type IsGreaterThan<
    A extends NumberLike,
    B extends NumberLike,
> = CompareNumbers<AsNumber<A>, AsNumber<B>> extends "greater"
    ? true
    : false;

/**
 * **IsGreaterThanOrEqual**`<A,B>`
 *
 * Test whether `A` is _greater than_ or _equal_ to `B`.
 */
export type IsGreaterThanOrEqual<
    A extends NumberLike,
    B extends NumberLike,
> = Or<[
    IsEqual<AsNumber<A>, AsNumber<B>>,
    IsGreaterThan<A, B>
]>;
