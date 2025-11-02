import type { CompareNumbers } from "inferred-types/types";

/**
 * **GreaterThan**`<A,B>`
 *
 * Boolean operator which checks whether `A` is
 * _greater than_ `B`.
 *
 * **Related:**
 * - `IsGreaterThan` wraps this utility but allows `NumberLike` inputs
 * - `GreaterThanOrEqual`, `LessThan`, `LessThanOrEqual`
 */
export type GreaterThan<
    A extends number,
    B extends number,
> =
number extends A
? boolean
: number extends B
    ? boolean
: [CompareNumbers<A, B>] extends ["greater"]
    ? true
    : false;
