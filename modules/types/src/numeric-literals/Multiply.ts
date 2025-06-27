import type { AfterFirst, AsNumber, Extends, FixedLengthArray, NumberLike, Or } from "inferred-types/types";

/**
 * **Multiply**`<A,B>`
 *
 * Multiplies two numbers together. Note, that these numbers must
 * be integers.
 */
export type Multiply<
    A extends NumberLike,
    B extends NumberLike,

    U extends readonly unknown[] = FixedLengthArray<1, AsNumber<A>>,
    R extends readonly unknown[] = FixedLengthArray<1, AsNumber<B>>,
    S extends readonly unknown[] = []
> = Or<[Extends<AsNumber<A>, 0>, Extends<AsNumber<B>, 0>]> extends true
    ? 0
    : [] extends R
        ? S["length"]
        : Multiply<
            A,
            B,
            U,
            AfterFirst<R>,
            [
                ...S,
                ...U
            ]
        >;
