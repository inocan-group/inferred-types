import type { AsNumber, CompareNumbers, If, IsEqual, NumberLike, Or } from "inferred-types/types";

type Calc<
    A extends number,
    B extends number,
    Count extends 1[] = [],
> =
Count["length"] extends A
    ? false
    : Count["length"] extends B
        ? true
        : Calc<A, B, [...Count, 1]>;

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
> = CompareNumbers<AsNumber<A>,AsNumber<B>> extends "greater"
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
    IsEqual<AsNumber<A>,AsNumber<B>>,
    IsGreaterThan<A,B>
]>;
