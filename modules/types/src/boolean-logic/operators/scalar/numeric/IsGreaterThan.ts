import type {
    AsNumber,
    CompareNumbers,
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
 * **Note:** does not take negative numbers into account
 */
export type IsGreaterThan<
    A extends NumberLike,
    B extends NumberLike,
> = number extends A
? boolean
: number extends B
? boolean
: IsBranded<A> extends true
    ? IsGreaterThan<Unbrand<A>, B>
    : IsBranded<B> extends true
        ? IsGreaterThan<A, Unbrand<B>>
        : string | number extends A
            ? boolean
            : string | number extends B
                ? boolean
                : CompareNumbers<AsNumber<A>, AsNumber<B>> extends "greater"
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
> = number extends A
? boolean
: number extends B
? boolean
: IsBranded<A> extends true
    ? IsGreaterThan<Unbrand<A>, B>
    : IsBranded<B> extends true
        ? IsGreaterThan<A, Unbrand<B>>
        : string | number extends A
            ? boolean
            : string | number extends B
                ? boolean
                : IsEqual<AsNumber<A>, AsNumber<B>> extends true
                    ? true
                    : CompareNumbers<AsNumber<A>, AsNumber<B>> extends "greater"
                        ? true
                        : false;
