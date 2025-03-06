import type { AsNumber, CompareNumbers, LessThanOrEqual, NumberLike } from "inferred-types/types";

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
> = CompareNumbers<AsNumber<A>, AsNumber<B>> extends "less" ? true : false;

/**
 * **IsLessThanOrEqual**`<A,B>`
 *
 * Test whether `A` is _less than_ or _equal_ to `B`.
 */
export type IsLessThanOrEqual<
    A extends NumberLike,
    B extends NumberLike,
> = LessThanOrEqual<AsNumber<A>, AsNumber<B>>;
