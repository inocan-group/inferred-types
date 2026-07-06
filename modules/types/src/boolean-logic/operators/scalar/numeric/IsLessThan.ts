import type {
    CompareNumbers,
    NumberLike,
} from "inferred-types/types";

type IsWideNumberLike<T extends NumberLike> = number extends T
    ? true
    : `${number}` extends T
        ? true
        : false;

/**
 * **IsLessThan**`<A,B>`
 *
 * Boolean type operator which determines whether `A`
 * is _less than_ `B`.
 *
 * - this wraps the `LessThan` utility and provides
 * the ability to pass in numbers _or_ numeric
 * string literals
 * - if you KNOW you'll be using numbers using `LessThan`
 * reduces type complexity a little bit.
 */
export type IsLessThan<
    A extends NumberLike,
    B extends NumberLike,
>
    = IsWideNumberLike<A> extends true
        ? boolean
        : IsWideNumberLike<B> extends true
            ? boolean
            : [CompareNumbers<A, B>] extends ["less"]
                ? true
                : false;

/**
 * **IsLessThanOrEqual**`<A,B>`
 *
 * Test whether `A` is _less than_ or _equal_ to `B`.
 *
 * **Related:**
 * - wraps `LessThanOrEqual` and allows not only numbers but numeric
 *   string literals to be passed in.
 */
export type IsLessThanOrEqual<
    A extends NumberLike,
    B extends NumberLike,
>
    = IsWideNumberLike<A> extends true
        ? boolean
        : IsWideNumberLike<B> extends true
            ? boolean
            : [CompareNumbers<A, B>] extends ["less" | "equal"]
                ? true
                : false;
