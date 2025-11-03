import type { CompareNumbers } from "inferred-types/types";

/**
 * **LessThan**`<A,B>`
 *
 * Boolean operator which checks whether `A` is
 * _less than_ `B`.
 *
 * - Note: this solution is cheap and cheerful and doesn't
 * try to address negative numbers or other edge cases
 */
export type LessThan<
    A extends number,
    B extends number,
>
    = number extends A
        ? boolean
        : number extends B
            ? boolean
            : CompareNumbers<A, B> extends "less" ? true : false;
