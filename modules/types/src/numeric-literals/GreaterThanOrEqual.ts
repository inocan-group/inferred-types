import type { CompareNumbers } from "inferred-types/types";

/**
 * **GreaterThanOrEqual**`<A,B>`
 *
 * Boolean operator which checks whether `A` is
 * _greater than_ or _equal to_ `B`.
 *
 * **Related:**
 * - `IsGreaterThanOrEqual` wraps this utility but allows `NumberLike` inputs
 * - `GreaterThanOrEqual`, `LessThan`, `LessThanOrEqual`
 */
export type GreaterThanOrEqual<
    A extends number,
    B extends number,
>
    = number extends A
        ? boolean
        : number extends B
            ? boolean
            : CompareNumbers<A, B> extends "greater"
                ? true
                : A extends B
                    ? true
                    : false
;
