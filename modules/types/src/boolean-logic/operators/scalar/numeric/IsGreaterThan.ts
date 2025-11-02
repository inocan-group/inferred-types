import type {
    AsNumber,
    CompareNumbers,
    GreaterThan,
    GreaterThanOrEqual,
    IsBranded,
    IsEqual,
    NumberLike,
    Unbrand
} from "inferred-types/types";

/**
 * **IsGreaterThan**`<A,B>`
 *
 * Boolean type operator which determines whether `A`
 * is _greater than_ `B`.
 *
 * **Related:**
 * - wraps `GreaterThan` and allows both _numbers_ and numeric string literals
 * - `IsGreaterThanOrEqual`, `IsLessThan`, `IsLessThanOrEqual`
 */
export type IsGreaterThan<
    A extends NumberLike,
    B extends NumberLike,
> =
A extends number
? B extends number
    ? GreaterThan<A,B>
    : GreaterThan<A, AsNumber<B>>
: B extends number
    ? GreaterThan<AsNumber<A>, B>
: GreaterThan<AsNumber<A>,AsNumber<B>>;

/**
 * **IsGreaterThanOrEqual**`<A,B>`
 *
 * Test whether `A` is _greater than_ or _equal_ to `B`.
 */
export type IsGreaterThanOrEqual<
    A extends NumberLike,
    B extends NumberLike,
> =
A extends number
? B extends number
    ? GreaterThanOrEqual<A,B>
    : GreaterThanOrEqual<A, AsNumber<B>>
: B extends number
    ? GreaterThanOrEqual<AsNumber<A>, B>
: GreaterThanOrEqual<AsNumber<A>,AsNumber<B>>;
