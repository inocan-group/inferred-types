import type {
    AsNumber,
    LessThan,
    LessThanOrEqual,
    NumberLike,
} from "inferred-types/types";

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
> =
A extends number
? B extends number
    ? LessThan<A,B>
: LessThan<A, AsNumber<B>>
: LessThan<AsNumber<A>,AsNumber<B>>;

/**
 * **IsLessThanOrEqual**`<A,B>`
 *
 * Test whether `A` is _less than_ or _equal_ to `B`.
 *
 * **Related:**
 * - wraps `LessThanOrEqual` and allows not only numbers but numeric
 *   string literals to be passed in. */
export type IsLessThanOrEqual<
    A extends NumberLike,
    B extends NumberLike,
> =
A extends number
? B extends number
    ? LessThanOrEqual<A,B>
    : LessThanOrEqual<A, AsNumber<B>>
: B extends number
    ? LessThanOrEqual<AsNumber<A>,B>
: LessThanOrEqual<AsNumber<A>,AsNumber<B>>;

