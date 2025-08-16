import type { As, Container, Contains, Dictionary, Err, IsSameContainerType, NumericKeys, ObjectKey, ObjectKeys } from "inferred-types/types";

/**
 * Efficiently filters tuples by removing never values using direct tail recursion
 */
type InTuple<
    A extends readonly unknown[],
    B extends readonly unknown[],
    Result extends readonly unknown[] = []
>
    = A extends readonly [infer Head, ...infer Tail]
        ? Contains<B, Head> extends true
            ? InTuple<Tail, B, [...Result, Head]>
            : InTuple<Tail, B, Result>
        : Result;

/**
 * **IntersectingKeys**`<A,B>`
 *
 * Provides a tuple of keys which are shared between the two
 * containers passed in `A` and `B`.
 *
 * - will usable in both arrays and objects, it's more common to
 * use this with objects.
 *
 * **Related:** `Intersection`
 */
export type IntersectingKeys<
    A extends Container,
    B extends Container,
> = IsSameContainerType<A, B> extends true
    ? A extends readonly unknown[]
        ? InTuple<
            NumericKeys<A>,
            NumericKeys<As<B, readonly unknown[]>>
        >
        : A extends Dictionary
            ? InTuple<
                As<ObjectKeys<A>, readonly ObjectKey[]>,
                As<ObjectKeys<B>, readonly ObjectKey[]>
            >
            : never
    : Err<
        `invalid-comparison/keys`,
        `The IntersectingKeys<A,B> utility works when both A and B are the same type of container but that was not the case!`,
        { a: A; b: B }
    >;
