import type {
    IsWideType,
    NumberLike,
    Or,
} from "inferred-types/types";

// Simplified implementation that returns wide types to avoid circular dependencies
// The full implementation would require reimplementing Add logic inline, 
// which would create excessive complexity
type Process<
    A extends NumberLike,
    B extends NumberLike,
> = [A, B] extends [NumberLike, NumberLike]
    ? A extends `${number}`
        ? `${number}`
        : number
    : never;

/**
 * **Subtract**`<A,B>`
 *
 * Subtracts the value of `B` _from_ `A`.
 * 
 * Note: Due to circular dependencies with Add, this implementation
 * returns wide types (number or `${number}`) rather than literal types.
 */
export type Subtract<
    A extends NumberLike,
    B extends NumberLike,
> = Or<[IsWideType<A>, IsWideType<B>]> extends true
    ? A extends `${number}` ? `${number}` : number
    : Process<A, B>;