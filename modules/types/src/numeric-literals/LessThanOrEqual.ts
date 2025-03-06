import type { CompareNumbers, Or } from "inferred-types/types";

/**
 * **LessThanOrEqual**`<A,B>`
 *
 * Boolean operator which checks whether `A` is
 * _less than_ `B`.
 *
 * - Note: this solution is cheap and cheerful and doesn't
 * try to address negative numbers or other edge cases
 */
export type LessThanOrEqual<A extends number, B extends number> = Or<[
    CompareNumbers<A, B> extends "less" ? true : false,
    CompareNumbers<A, B> extends "equal" ? true : false
]>;
