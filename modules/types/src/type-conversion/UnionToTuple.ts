import type { Contains, RemoveBoolean } from "inferred-types/types";

/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
type UnionToIntersection<U> = (
    U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
    ? I
    : never;

/**
 * LastInUnion<1 | 2> = 2.
 */
type LastInUnion<U> = UnionToIntersection<
    U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
    ? L
    : never;

type PreserveBoolean<T extends readonly unknown[]>
    = Contains<T, true, "equals"> extends true
        ? Contains<T, false, "equals"> extends true
            ? [
                ...RemoveBoolean<T>,
                boolean
            ]
            : T
        : T

;

/**
 * **UnionToTuple**`<1 | 2> => [1, 2]`
 *
 * Converts union members into a tuple.
 *
 * **Related**: `UnionArrayToTuple`, `UnionToTuple__PreserveBoolean`
 */
export type UnionToTuple<
    U,
    Last = LastInUnion<U>
> = [U] extends [never]
    ? []
    : [...UnionToTuple<Exclude<U, Last>>, Last];

/**
 * **UnionToTuple__PreserveBoolean**`<1 | 2 | boolean> => [1, 2, boolean]`
 *
 * Converts union members into a tuple and makes sure if both `true` and `false`
 * are found in the resulting tuple that this is replaced with just `boolean`.
 *
 * - ensuring that the `boolean` type is _preserved_ adds a small amount of
 *   type complexity and often doesn't matter.
 * - if you don't care about preserving the wide `boolean` type then use
 *   `UnionToTuple` instead.
 *
 * **Related**: `UnionArrayToTuple`, `UnionToTuple`
 */
export type UnionToTuple__PreserveBoolean<T> = PreserveBoolean<UnionToTuple<T>>;
