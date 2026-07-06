import type {
    CompareNumbers,
    NumberLike
} from "inferred-types/types";

type IsWideNumberLike<T extends NumberLike> = number extends T
    ? true
    : `${number}` extends T
        ? true
        : false;

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
>
    = IsWideNumberLike<A> extends true
        ? boolean
        : IsWideNumberLike<B> extends true
            ? boolean
            : [CompareNumbers<A, B>] extends ["greater"]
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
>
    = IsWideNumberLike<A> extends true
        ? boolean
        : IsWideNumberLike<B> extends true
            ? boolean
            : [CompareNumbers<A, B>] extends ["greater" | "equal"]
                ? true
                : false;
