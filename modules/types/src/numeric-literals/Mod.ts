import type { And, IsInteger } from "types/boolean-logic";
import type { Err } from "types/errors";
import type { Abs, NumberLike } from "types/numeric-literals";
import type { FixedLengthArray } from "types/tuples";
import type { AsNumber } from "types/type-conversion";

type Gte<
    A extends unknown[],
    B extends unknown[]
> = B extends []
    ? true
    : A extends []
        ? false
        : A extends [infer _, ...infer ATail]
            ? B extends [infer _, ...infer BTail]
                ? Gte<ATail, BTail>
                : never
            : never;

type Sub<
    A extends unknown[],
    B extends unknown[]
> = B extends []
    ? A
    : B extends [infer _, ...infer BTail]
        ? A extends [infer _, ...infer ATail]
            ? Sub<ATail, BTail>
            : never
        : never;

// modulus
type Modulus<
    A extends number[],
    B extends number[]
> = Gte<
    A,
    B
> extends true ? Modulus<Sub<A, B>, B> : A;

/**
 * **Mod**`<A,B>`
 *
 * A type utility which provides the _remainder_ (aka., **modulus**) of
 * a division of two integers.
 */
export type Mod<
    A extends NumberLike,
    B extends NumberLike
> = A extends `${number}`
    ? Mod<AsNumber<A>, AsNumber<B>>
    : B extends `${number}`
        ? Mod<A, AsNumber<B>>
        : number extends A
            ? number
            : number extends B
                ? number
                : And<[
                    IsInteger<A>,
                    IsInteger<B>
                ]> extends true
                    ? B extends 0
                        ? Err<
                            "mod/division-by-zero",
        `The Mod<${A},${B}> type utility can not receive 0 as the divisor.`,
        { a: A; b: B }
                        >
                        : Modulus<
                            FixedLengthArray<number, Abs<A>>,
                            FixedLengthArray<number, Abs<B>>
                        > extends infer M extends unknown[]
                            ? M["length"]
                            : never
                    : Err<
                        `mod/non-integer`,
                `The Divide<${A},${B}> can only be used with integer values!`,
                { a: A; b: B }
                    >;
