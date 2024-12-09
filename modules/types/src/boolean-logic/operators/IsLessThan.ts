import type { AsNumber, IsEqual, NumberLike } from "inferred-types/types";

type Calc<
  A extends number,
  B extends number,
  Count extends 1[] = [],
> =
Count["length"] extends B
  ? false
  : Count["length"] extends A
    ? true
    : Calc<A, B, [...Count, 1]>;

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
> = Calc<AsNumber<A>, AsNumber<B>>;

/**
 * **IsLessThanOrEqual**`<A,B>`
 *
 * Test whether `A` is _less than_ or _equal_ to `B`.
 */
export type IsLessThanOrEqual<
  A extends NumberLike,
  B extends NumberLike,
> = IsEqual<A, B> extends true
  ? true
  : IsLessThan<A, B>;
