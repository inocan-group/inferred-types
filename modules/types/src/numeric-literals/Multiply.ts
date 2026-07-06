import type { AsNumber, FixedLengthArray, NumberLike, Or } from "inferred-types/types";

type IsZero<T extends NumberLike> = AsNumber<T> extends 0 ? true : false;

type MultiplyTuples<
    U extends readonly unknown[],
    R extends readonly unknown[],
    S extends readonly unknown[] = []
> = R extends readonly []
    ? S["length"]
    : R extends readonly [unknown, ...infer Rest extends readonly unknown[]]
        ? MultiplyTuples<U, Rest, [...S, ...U]>
        : number;

type Process<
    A extends number,
    B extends number,
> = FixedLengthArray<unknown, A> extends infer U extends readonly unknown[]
    ? FixedLengthArray<unknown, B> extends infer R extends readonly unknown[]
        ? MultiplyTuples<U, R>
        : never
    : never;

/**
 * **Multiply**`<A,B>`
 *
 * Multiplies two numbers together. Note, that these numbers must
 * be integers.
 */
export type Multiply<
    A extends NumberLike,
    B extends NumberLike,
> = Or<[IsZero<A>, IsZero<B>]> extends true
    ? 0
    : number extends AsNumber<A>
        ? number
        : number extends AsNumber<B>
            ? number
            : Process<AsNumber<A>, AsNumber<B>>;
